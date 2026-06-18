# Prompt Log

This file records the prompts and implementation decisions used to generate the code for the Ocean Across frontend developer assessment.

## User Prompt

> This email pertains to your application for the FrontEnd Developer position at Ocean Across. As part of the selection process, please find the attached assignment, which we request you complete and submit within the next 48 hours.
>
> Kindly include the complete prompt log used to generate the code.
>
> Please do not hesitate to contact us if you have any questions regarding this matter.
>
> this is the main content
>
> and i have attached the assessement file
>
> please add the code by following all the rules in the pdf and add the code into ocean cross folder

## Assessment Requirements Extracted From PDF

- Build a grocery delivery web application from the provided mobile-first Figma reference.
- Use React, TypeScript in strict mode, Tailwind CSS, Zustand, and React Router.
- Do not use Redux, MobX, Context API for global state, UI component libraries, or inline CSS.
- Implement authentication and onboarding screens: splash, welcome, login, sign up, OTP verification, and location selection.
- Implement main app screens: home, category product listing, product details, search, filters, cart, and favorites.
- Implement checkout screens: order success and order failure.
- Use separate Zustand stores.
- Use mock JSON-style product and category data.
- Simulate API calls using `setTimeout`.
- Design desktop layouts with a `max-w-7xl` container, 4-column product grid, category/filter sidebar, and sticky checkout summary.
- Include TypeScript interfaces for `Product`, `CartItem`, and `User`.
- Include enums for order status and product categories.
- Add bonus UX where practical: skeleton loaders, empty states, error states, debounced search, keyboard accessibility, and smooth transitions.

## Figma Access Note

The public Figma URL from the PDF was fetched with a browser-like request. It exposed the file title, "Frontend Grocery App Test", and page metadata, but the full canvas details were not available through the non-interactive environment. The implementation therefore follows the PDF requirements closely and mirrors a mobile-first grocery app visual language with green primary actions, rounded product cards, bottom mobile navigation, image-led product surfaces, and responsive desktop layouts.

## Generation Steps

1. Extracted the assessment text from `/Users/apple/Downloads/Ocean Across FE Dev Assessment.pdf`.
2. Inspected `/Users/apple/Desktop/OceanCross`, which was empty.
3. Created a Vite React project directly in the OceanCross folder.
4. Added strict TypeScript, Tailwind CSS, React Router, Zustand, and typed mock catalog data.
5. Created separate Zustand stores for authentication, products/favorites/filters, and cart/checkout state.
6. Implemented all required screens and flows in `src/App.tsx`.
7. Added responsive mobile and desktop layouts using Tailwind utilities.
8. Added this prompt log for assignment submission.

## Main Implementation Prompt Used Internally

Build a complete mobile-first grocery delivery React app in the empty OceanCross folder using Vite, TypeScript strict mode, Tailwind CSS, Zustand, and React Router. Implement all PDF-required screens: splash, welcome, login, sign up, OTP verification, location selection, home, category listing, product details, search, filters, cart, favorites, order success, and order failure. Use mock product/category data, separate Zustand stores, simulated loading with `setTimeout`, debounced search, skeleton loaders, empty states, keyboard-friendly controls, mobile bottom navigation, desktop `max-w-7xl` layout, 4-column product grids, filter sidebar, and sticky cart summary. Avoid UI component libraries, inline CSS, Redux, MobX, and Context API.
