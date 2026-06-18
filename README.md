# Ocean Across Grocery App

Frontend developer assessment implementation for a responsive grocery delivery web application.

## Tech Stack

- React with Vite
- TypeScript strict mode
- Tailwind CSS
- Zustand stores
- React Router

## Implemented Screens

- Splash, onboarding, login, sign up, OTP verification, and location selection
- Home, category listing, product details, search, filters, cart, and favorites
- Checkout success and checkout failure states

## Run Locally

```bash
npm install
npm run dev
```

## Validate

```bash
npm run build
```

## Notes

- OTP demo code is `1234`.
- Product and category data are mocked in `src/data/catalog.ts`.
- Global state is split across `src/stores/authStore.ts`, `src/stores/productStore.ts`, and `src/stores/cartStore.ts`.
- The complete prompt log is included in `PROMPT_LOG.md`.
