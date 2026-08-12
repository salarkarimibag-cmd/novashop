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

Every service in `src/services/` (except `productService`) is a default-exported object of
methods wrapping `apiClient`. **Backend responses are wrapped inconsistently** — most endpoints
nest the payload under `data`, but not all. `authService` normalises this with an `unwrap()`
helper (`response?.data ?? response`) and throws when a login comes back without a token;
follow that pattern rather than passing a raw response to a store. Check the specific service
before assuming a response shape.

`apiClient` treats `401` as an expired session **only when a token was sent** — a `401` without
one means bad credentials and is thrown to the caller. Pass `redirectOnUnauthorized: false` for
background checks that shouldn't navigate the user away (see `authService.me`).

### State: Zustand stores and hydration

Stores live in `src/store/`, each a default export, re-exported from `src/store/index.js`.
All use `persist` to `localStorage` under `nova-*` keys (`nova-auth`, `nova-cart`,
`nova-checkout`, `nova-wishlist`, ...).

**Critical**: all six stores set `skipHydration: true`, so the first client render matches the
server's HTML and nothing reads `localStorage` before React hydrates.
`HydrationProvider` (`src/components/providers/`) `await`s `persist.rehydrate()` on all six and
exposes the result through a `useHydration()` context — it **renders children immediately**, so
never assume persisted state is available on first render. If you add a persisted store,
register its `rehydrate()` call there or its state will never load.

Anything that reads persisted data or fires an authenticated request on mount must wait for
`hydrated` — otherwise the request goes out with no `Authorization` header. Pages under
`ProtectedRoute` are covered by its loading gate; `/cart`, `/checkout` and `/order-success` are
not, and gate their own effects.

Store responsibilities:

- `authStore` — user/token/loading. `login({user, token})`, `clearAuth()`. `partialize` persists
  only user and token; `loading` starts `true` until `AuthProvider` resolves. `isAuthenticated`
  is derived in `useAuth`, not stored.
- `cartStore` — server-backed. Every mutation calls `cartService` and feeds the response
  through `updateCartState(cart)`. `fetchCart` returns early without a token and has an
  `isFetching` guard against request loops. Item count comes from the exported
  `selectTotalQuantity` selector — it is not kept in state.
- `wishlistStore` — purely client-side/localStorage, not synced to the backend. Normalizes
  IDs via `String(product._id || product.id)`.
- `checkoutStore` — shipping address form draft, shipping/payment method, note.
- `orderStore`, `addressStore`.

Product list filters are **not** in a store — they live in the URL. `src/app/products/page.js`
is an async Server Component that reads them via `parseProductFilters` (`src/lib/productFilters.js`)
and fetches on the server; the filter controls are client components that write back through the
`useProductFilters` hook. Keep it that way: filtered results stay linkable, the back button works,
and the list is server-rendered.

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
  in the root layout. Never `alert()` — it blocks the main thread and ignores the RTL styling.
- **Icons**: `lucide-react` (`react-icons` is also present in a few older components).
  **Sliders/carousels**: `swiper` (`swiper/react` + `swiper/modules`, with the per-feature
  `swiper/css/*` imports).
- **Styling**: Tailwind v4 via `@import "tailwindcss"` in `src/app/globals.css` — no
  `tailwind.config.js`; theme extensions go in the `@theme` block there.
- **State**: Zustand only. Don't introduce Redux.
- **Images**: product images go through `getProductImage()` in `src/constants/images.js`.
  `next.config.mjs` whitelists the `NEXT_PUBLIC_API_URL` host for `next/image`.
- `no-console` is enforced by ESLint; `console.warn`/`console.error` are allowed, `console.log`
  is not.
- Never report success before it is confirmed. Await the request, seed state from the server's
  response rather than the submitted values, and throw when the response lacks what it promised
  — several bugs here were success toasts over silent failures.

## Known rough edges

- Shipping is unresolved: `checkout/OrderSummary.jsx` charges `getShippingCost(subtotal)`
  (flat 150,000, free over 5,000,000) to match the backend, while `ShippingMethod.jsx`
  advertises per-method prices from `SHIPPING_PRICES` that affect nothing — and the selected
  `shippingMethod` is never sent with the order. Fixing it needs to know whether the backend
  prices shipping methods at all.
- `next` is pinned to 16.2.10 and carries open advisories fixed in 16.3.0 (along with its
  bundled `postcss` and `sharp`). Upgrading means moving `eslint-config-next` in step.
