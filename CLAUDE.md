# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working with the author (read this first)

The author wrote this project themselves and is **actively learning web development**. These
rules apply to every conversation in this repo:

1. **Teach, don't just patch.** After (or while) making any change, explain it in detail and
   in Persian: what the problem was, why it is a problem, what the fix does line by line,
   which concept it illustrates (React re-renders, hydration, HTTP status codes, ...), and
   what would break if it were done differently. Never hand over a silent diff. Assume the
   author wants to understand the change well enough to write it themselves next time.
2. **Write clean, standard code.** Follow the conventions already in this file and in the
   surrounding code, keep names meaningful, remove debug leftovers, avoid duplicated logic,
   and prefer the idiomatic Next.js/React solution over a clever one. If a common pattern or
   best practice applies, use it and name it in the explanation.
3. **Fix one issue at a time.** Work through problems individually — explain, change, confirm
   — rather than delivering a large refactor in one step.

## Commands

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config, eslint-config-next/core-web-vitals)
```

No test runner is configured in this project.

## Backend dependency

This repo is **frontend only**. Every data path talks to a separate API server at
`NEXT_PUBLIC_API_URL` (`.env.local`, defaults to `http://localhost:5000`). Nothing works
without that backend running — there are no Next.js route handlers or mock data layer.

## Architecture

Next.js 16 App Router, JavaScript (no TypeScript), React 19, Tailwind CSS v4, Zustand for
state. Path alias `@/*` → `./src/*` (`jsconfig.json`).

### Two distinct data-fetching paths

There are **two parallel HTTP layers**, and which one to use depends on whether the request
needs auth:

1. **`src/lib/apiClient.js`** — authenticated requests. Reads the JWT from
   `useAuthStore.getState().token`, sets the `Authorization: Bearer` header, and on `401`
   calls `clearAuth()` and hard-redirects to `/login`. Throws `Error(data.message)` on
   non-OK responses, so callers use try/catch and surface `error.message` via toast.
2. **Raw `fetch`** — public/unauthenticated data. `src/services/productService.js` does this
   directly with `cache: "no-store"`; `AuthProvider` also fetches `/api/auth/profile` raw.

`src/lib/axios.js` and `src/lib/auth.js` are empty placeholder files despite `axios` being a
dependency — nothing imports axios. Don't assume they contain anything.

Every service in `src/services/` (except `productService`) is a default-exported object of
methods wrapping `apiClient`. Backend responses are unwrapped inconsistently — some return
`res.data`, product endpoints return `result.products || result.data`. Check the specific
service before assuming a response shape.

### State: Zustand stores + the hydration gate

Stores live in `src/store/`, each a default export, re-exported from `src/store/index.js`.
All use `persist` to `localStorage` under `nova-*` keys (`nova-auth`, `nova-cart`,
`nova-checkout`, `nova-wishlist`, ...).

**Critical**: every store except `authStore` sets `skipHydration: true`.
`HydrationProvider` (`src/components/providers/`) manually `await`s
`persist.rehydrate()` on all six stores and **renders `null` until they finish**, exposing
the flag through a `useHydration()` context. If you add a new persisted store, register its
`rehydrate()` call there or its persisted state will never load. `AuthProvider` sits inside
it and only re-validates the token against `/api/auth/profile` once `hydrated` is true.

Store responsibilities:

- `authStore` — user/token/isAuthenticated/loading. `login({user, token})`, `clearAuth()`.
- `cartStore` — server-backed. Every mutation calls `cartService` and feeds the response
  through `updateCartState(cart)`, which recomputes `totalQuantity`. Has an `isFetching`
  guard in `fetchCart` to prevent request loops.
- `wishlistStore` — purely client-side/localStorage, not synced to the backend. Normalizes
  IDs via `String(product._id || product.id)`.
- `checkoutStore` — shipping address form draft, shipping/payment method, note.
- `orderStore`, `addressStore`, `filterStore` (product list filters, read by
  `src/app/products/page.js` to refetch).

Thin hooks in `src/hooks/` (`useAuth`, `useCart`, `useOrders`) just wrap store selectors —
prefer these in components over reaching into the store directly.

### Routing and auth protection

Everything under `src/app/account/` is wrapped by `ProtectedRoute` in
`src/app/account/layout.jsx`, which redirects to `/login` when `!loading && !user`. There is
no middleware — protection is client-side only, so protected pages are `"use client"`.

Page files mix `.js` and `.jsx` extensions; components are `.jsx`. Component folders often
export through an `index.js` barrel — import from the folder when one exists.

### Forms

Formik + Yup. Schemas live in `src/validations/` (`loginSchema`, `registerSchema`,
`checkoutSchema`) and are passed as `validationSchema` to `useFormik`. Shared inputs
(`src/components/ui/Input|Select|Textarea`) take a `label` and an `error` prop fed as
`formik.touched.x && formik.errors.x`.

## Conventions

- **The UI is Persian and RTL.** `<html lang="fa" dir="rtl">` with the local Vazirmatn font
  (`src/assets/fonts/`, loaded via `next/font/local`). All user-facing strings, toasts, and
  thrown error messages are in Persian. Many code comments are Persian too — match that.
- **Prices**: `src/lib/formatPrice.js` renders `toLocaleString("fa-IR")` + `" تومان"`.
  Several components inline the same `toLocaleString("fa-IR")` call instead; prefer the
  helper for new code.
- **Toasts**: `sonner` only (`import { toast } from "sonner"`), `<Toaster dir="rtl">` mounted
  in the root layout. `react-hot-toast` is a dependency but unused.
- **Icons**: `lucide-react`. **Sliders/carousels**: `swiper` (`swiper/react` + `swiper/modules`,
  with the per-feature `swiper/css/*` imports).
- **Styling**: Tailwind v4 via `@import "tailwindcss"` in `src/app/globals.css` — no
  `tailwind.config.js`; theme extensions go in the `@theme` block there.
- `@reduxjs/toolkit` / `react-redux` are installed but **not used** — this app is Zustand-only.
  Don't introduce Redux.

## Known rough edges

- Debug `console.log` calls are left in production paths (`cartStore.fetchCart`,
  `cartService.addToCart`, `ProtectedRoute`, `OrderSummary`). Don't add more.
- Shipping cost is duplicated and inconsistent: `src/constants/shipping.js` has
  `SHIPPING_PRICES`, while `checkout/OrderSummary.jsx` hardcodes `subtotal >= 5000000 ? 0 :
  150000` "to match the backend".
