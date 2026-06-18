# Prompt Log

Below is the prompt log used while building the Ocean Across frontend assessment. The prompts are grouped in the same order the features were planned and implemented.

## 1. Project Setup

Create a new React frontend project for a grocery delivery web application using Vite, TypeScript, Tailwind CSS, React Router, and Zustand.

Keep TypeScript strict, avoid `any`, and do not use Redux, MobX, Context API for global state, or any UI component library.

Set up the basic folder structure with `src`, routing, styles, shared types, mock data, stores, and utility files.

## 2. App Theme and Layout

Design the app as a mobile-first grocery delivery experience inspired by modern grocery apps.

Use green as the main brand color, white cards, soft backgrounds, product images, rounded grocery cards, and clear call-to-action buttons.

Make sure the desktop version does not look like a stretched mobile screen. Use a `max-w-7xl` layout, wider content areas, desktop grids, and side panels where needed.

## 3. TypeScript Models

Create proper TypeScript interfaces for:

- Product
- CartItem
- User
- Category

Create enums for:

- Product categories
- Order status

Use these types across stores, components, and mock data.

## 4. Mock Grocery Data

Create mock product and category data for the grocery app.

Add categories such as fruits, vegetables, dairy, bakery, meat, and beverages.

Each product should include name, category, price, unit, image, rating, origin, description, nutrition details, tags, and stock status.

Use static image URLs and keep the data realistic enough for product listing, search, filters, cart, favorites, and product detail pages.

## 5. Zustand Stores

Create separate Zustand stores instead of putting all global state in one place.

Create an auth store for user details, onboarding, login, signup, OTP verification, and location selection.

Create a product store for product loading, favorites, search term, selected category, max price, stock filter, and clearing filters.

Create a cart store for cart items, add/remove/increase/decrease quantity, clearing cart, checkout status, and simulated checkout.

Simulate product loading and checkout with `setTimeout`.

## 6. Authentication Flow

Build the authentication and onboarding flow from the assignment.

Create these screens:

- Splash screen
- Welcome / onboarding screen
- Login screen
- Sign up screen
- OTP verification screen
- Location selection screen

Use the OTP code `1234` for demo verification and redirect users into the main app after location selection.

## 7. Main App Shell

Create the main application shell with a sticky top bar and mobile bottom navigation.

The top bar should show the app logo, selected location, and cart shortcut.

The mobile bottom navigation should include home, search, favorites, cart, and account/location.

Use React Router for all screen navigation.

## 8. Home Screen

Build the grocery home screen.

Add a delivery hero section, shop-by-category section, and best-selling products section.

On mobile, the layout should feel close to a grocery app with cards and bottom navigation.

On desktop, use a wider responsive layout with larger hero content and product grids.

## 9. Category and Product Listing

Create category-based product listing pages.

When a user opens a category, show the selected category details and only products from that category.

For desktop, include a category/filter sidebar.

For product lists, use a responsive grid with at least four columns on large screens.

## 10. Product Details

Create a product details screen.

Show product image, name, category, unit, rating, origin, description, nutrition tags, favorite button, price, stock state, and add-to-cart button.

Make the page responsive with image and product details side by side on desktop.

## 11. Search and Filters

Create a search screen with debounced search.

Search should match product names and tags.

Add filters for category, max price, and in-stock-only products.

Use a sidebar filter panel on desktop and a filter sheet/modal on mobile.

Add empty states when no products match the search or filters.

## 12. Favorites

Create a favorites screen.

Allow users to favorite and unfavorite products from product cards and product details.

Show saved products on the favorites page.

If there are no favorites, show a clean empty state with a button to browse products.

## 13. Cart

Create the cart screen.

Show each cart item with product image, name, unit, quantity controls, remove button, and line total.

Add subtotal, delivery fee, and total.

On desktop, keep the order summary sticky while the cart list scrolls.

## 14. Checkout States

Create order success and order failure screens.

The cart should simulate checkout using a delay.

Add a normal checkout button that leads to success and a demo failure button that leads to the failure state.

Clear the cart after a successful order.

## 15. UX Improvements

Add skeleton loaders while product data is loading.

Add empty states for cart, favorites, and search results.

Use accessible buttons, labels, focus states, and keyboard-friendly form controls.

Add smooth hover and transition states using Tailwind utilities.

## 16. Documentation

Add a README file explaining the project, stack, implemented screens, local setup command, build command, and notes.

Add this prompt log file for submission as required by the assignment.

Mention that the full app uses mock data and no backend.
