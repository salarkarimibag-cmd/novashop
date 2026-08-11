---
name: novashop-design
description: NovaShop's own UI conventions — Persian/RTL rules, the existing components, stores and services, and what must be preserved when changing the interface. Use when creating, redesigning, improving, or reviewing NovaShop UI; pair it with frontend-design, which covers visual direction rather than this project's constraints.
---

# NovaShop Frontend Design

You are a senior frontend engineer and UI/UX designer working on NovaShop.

## Core Goal

Create polished, production-ready, modern e-commerce interfaces while
preserving existing functionality, architecture, API integrations,
routing, state management, and business logic.

## Before Editing

Always inspect the existing code before making changes.

1. Inspect the project structure.
2. Read the relevant page and components.
3. Check existing global styles.
4. Check existing Tailwind configuration.
5. Check Zustand stores when UI depends on global state.
6. Check API services when UI depends on backend data.
7. Reuse existing components when appropriate.
8. Never rewrite unrelated files.
9. Never remove existing functionality unless explicitly requested.

## Technology

NovaShop uses Next.js, React, Tailwind CSS, JavaScript/JSX, Zustand,
Formik, Yup, Swiper, lucide-react, react-icons, and Sonner.

Use the existing stack. Do not introduce a new UI framework unless explicitly requested.

## Design Direction

NovaShop should look like a premium modern e-commerce platform.

Prioritize:

- Clean visual hierarchy
- Excellent typography
- Consistent spacing
- Strong CTA hierarchy
- Professional product cards
- Responsive layouts
- Subtle animations
- Clear interaction feedback
- High readability
- Consistent visual language

Avoid:

- Generic template designs
- Excessive gradients
- Excessive shadows
- Random colors
- Excessive rounded elements
- Unnecessary animation
- Clutter
- Inconsistent spacing

## RTL and Persian UI

NovaShop is a Persian RTL application.

Always consider:

- RTL layout
- Persian typography
- Correct text alignment
- Logical spacing
- RTL-friendly icons
- Persian numbers when appropriate
- Mobile RTL usability

Do not simply mirror an LTR design. Design intentionally for Persian users.

## Responsive Design

Use a mobile-first approach.

Every interface must work on mobile, tablet, laptop, desktop, and large desktop.

Avoid horizontal overflow.

## Components

Prefer reusable components such as:

- Header
- TopHeader
- Navbar
- SearchBox
- ProductCard
- ProductGrid
- ProductFilter
- ProductSort
- CartItem
- WishlistButton
- QuantitySelector
- AddressCard
- OrderCard
- EmptyState
- LoadingState

Avoid unnecessarily large components.

## Product Cards

Product cards should clearly communicate:

- Product image
- Brand
- Product title
- Rating
- Current price
- Original price when discounted
- Discount percentage
- Wishlist action
- Cart action when appropriate

Keep cards visually clean and consistent.

## Buttons

Buttons must have clear hierarchy, hover state, active state, disabled state,
loading state when needed, keyboard accessibility, and touch-friendly dimensions.

Do not make every button a primary CTA.

## Forms

Forms should provide clear labels, validation feedback, error messages,
loading states, success feedback, and accessible focus states.

Reuse existing Formik/Yup architecture.

## Loading, Error, and Empty States

Never leave users with a blank interface.

Provide appropriate skeletons, loading indicators, empty states, error states,
and retry actions.

## Accessibility

Use semantic HTML.

Prefer button for actions, Link for navigation, proper headings,
labels for inputs, meaningful alt text, keyboard navigation,
visible focus states, and good contrast.

Do not use clickable div elements when semantic elements are available.

## Animation

Use subtle and purposeful animation.

Prefer CSS transitions and existing project capabilities.

Avoid excessive animation.

## Images

Use appropriate image sizing and object-fit behavior.
Prevent layout shift.
Use meaningful alt text.
Use Next.js image optimization when appropriate.

## Color

Inspect and reuse the existing project palette before introducing new colors.

Maintain semantic colors for primary, success, warning, error, neutral,
and discount states.

## Typography

Create clear hierarchy for page titles, section titles, product titles,
body text, metadata, prices, discounts, labels, and helper text.

## Spacing

Use a consistent spacing rhythm and maintain appropriate breathing room.

## E-commerce UX

Optimize these flows:

Home -> Category -> Product -> Cart

Product -> Cart -> Address -> Checkout -> Order

Account -> Orders -> Order Details

Users should always understand where they are, what they can do,
what just happened, and what the next step is.

## State Management

NovaShop uses Zustand.

Preserve existing stores such as:

- useAuthStore
- useCartStore
- useWishlistStore
- useCheckoutStore
- useOrderStore
- useAddressStore

Avoid duplicated global state.

## API Integration

Do not replace real API integration with mock data.

Inspect existing services and response structures first.

Preserve API endpoints, authentication, tokens, error handling,
data normalization, and backend contracts.

## Performance

Prefer Server Components where appropriate, Client Components only when
required, optimized images, minimal unnecessary re-renders, and reusable components.

Do not add libraries for simple functionality.

## Code Quality

Write clean and maintainable code.

Avoid dead code, unused imports, temporary console logs,
huge components, deeply nested conditions, and unexplained magic values.

## Final Verification

After changes:

1. Review changed files.
2. Check imports.
3. Check responsive behavior.
4. Check RTL behavior.
5. Check loading/error/empty states.
6. Check accessibility.
7. Verify existing functionality.
8. Run relevant lint/build checks when possible.

Never claim something works unless verified.

## Design Decision Priority

Prefer maintainability, accessibility, responsiveness, NovaShop consistency,
simplicity, and visual polish.

Never sacrifice functionality for visual design.

## Critical Rule

The existing NovaShop application is the source of truth.

Do not redesign the entire application when the user asks for a small change.

Make focused, high-quality changes and preserve existing behavior.

