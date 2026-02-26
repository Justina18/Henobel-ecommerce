# Henobel Agro Tech Frontend

This is a client-side e-commerce frontend built with **Vite**, **React**, **TypeScript**,
**Tailwind CSS**, and a minimal design system. It showcases sustainable agricultural
products fetched from the [Open Food Facts](https://world.openfoodfacts.org) public API.

## Features

- Branding: green leaf logo, custom color palette, clean typography
- Responsive header with mobile menu
- Product grid with add-to-cart simulation
- Category filtering
- Real public API integration with fallback mock data
- Tailwind utility classes extended with Henobel colors

## Setup

```bash
# from workspace root
npm install
npm run dev
```

Navigate to `http://localhost:5174` to view the site. The development server
automatically recompiles on file changes.

## Project structure

- `src/components/ui` – design-system components (header, product card, button)
- `src/lib` – utility helpers and API client
- `src/pages/home.tsx` – main page containing layout and state
- `tailwind.config.js` – custom color palette

## Adding shadcn/ui components

Although the sample button is homemade, you can integrate **shadcn/ui** by running:

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
```

This will create a `/src/components/ui` folder (already present) and provide
accessible primitives that can be themed to match Henobel's branding.

## Notes

- The `@/` alias points to `src/` via `vite.config.ts` and `tsconfig.json`.
- `next/image` was replaced with a normal `<img>` since this is not a Next.js
  project.

---

You're now all set to continue building Henobel Agro Tech's frontend. Happy
hacking! The design system path `/components/ui` is important for consistency;
keep things organized there as the project grows.