# Marketplace — E-commerce Frontend

A responsive e-commerce storefront built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**, powered by the [Fake Store API](https://fakestoreapi.com/).

## Features

- Product listing with data fetched from the Fake Store API
- Product details page with dynamic routing (`/product/:id`)
- Search by title, category filtering, and sorting (price ↑↓, alphabetical)
- Shopping cart: add / remove / update quantity, totals, persisted to Local Storage
- Wishlist saved to Local Storage
- Login page using the Fake Store mock `/auth/login` endpoint
- Loading states and error handling with retry
- Fully responsive layout (mobile, tablet, desktop)

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

To create a production build:

```bash
npm run build
npm run preview
```

## Demo login

The Fake Store API's mock auth accepts these documented test credentials (already pre-filled on the login page):

- **Username:** `mor_2314`
- **Password:** `83r5^_`

## Project structure

```
src/
  api/            Fake Store API client (fetch wrapper + typed calls)
  components/     Reusable UI: Navbar, Footer, ProductCard, Loader, ErrorMessage, etc.
  context/        React Context providers: Cart, Wishlist, Auth
  hooks/          useLocalStorage hook
  pages/          Route-level pages: Home, ProductDetails, Cart, Wishlist, Login, NotFound
  types/          Shared TypeScript types
  App.tsx         Route definitions
  main.tsx        App entry point / providers
```

## Notes

- Cart and wishlist state persist across reloads via `localStorage`.
- The Fake Store API's `/auth/login` endpoint accepts most username/password combos loosely for demo purposes — real credential validation isn't enforced by the API itself.
