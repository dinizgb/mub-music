# Mub Music — Project Rules

Single source of truth for coding conventions. Cursor and Claude configs point here.

## Stack

- **Next.js** App Router (`app/`), React 19, TypeScript
- **Styling:** Tailwind CSS v4 + local shadcn/ui primitives (`components/ui/`)
- **Do not** reintroduce Material UI, Emotion, or styled-components
- **Data:** Apollo Client + GraphQL; client state via Redux Toolkit where already used

## Visual design

- Keep the current look: tokens live in `app/globals.css` (`@theme`)
- Brand colors: dark background `#080B14`, primary gold `#F5B100`, secondary `#20232E`
- Breakpoints: `xs` 600px, `sm` 900px, `md` 1200px (not Tailwind defaults)
- shadcn supplies accessible primitives; restyle them to brand tokens — do not adopt the default shadcn theme as the product look

## Styling patterns

- Prefer Tailwind utility classes and `cn()` from `lib/utils.ts`
- Shared interactive primitives: `components/ui/*` (button, input, accordion, radio-group, breadcrumb, avatar)
- Icons: `lucide-react` (not MUI icons)
- Pass typography colors via Tailwind `className` tokens (`text-text-4`, `hover:text-primary`, etc.). Hover overrides like `group-hover:text-black!` go **on the typography element itself** — parent `[&_h4]:…` selectors are fragile
- Avoid parent selectors like `[&_div]:flex-col` when they would break nested widgets (e.g. `StarsWidget` horizontal layout)
- Color inheritance for icons: put `text-*` on the widget wrapper; children use `fill-current` so hover can override

## Components & lists

- External offer/review links: wrap the row in `<a href={url} target="_blank" rel="noreferrer">` (see `ReviewsSidebarList` / `OffersSidebarList`)
- Keep `"use client"` only where hooks, Redux, or browser APIs are required
- Preserve existing URL shapes and `trailingSlash: true`

## Formatting & lint

- Prettier 3 with plugins (order matters): `prettier-plugin-tailwindcss`, `prettier-plugin-classnames`, `prettier-plugin-merge`
- Config: `.prettierrc` — `printWidth` 80; classnames plugin wraps long `className` strings
- ESLint: `react/react-in-jsx-scope` and `react/jsx-uses-react` are **off** (React 19 / Next JSX transform)
- Prefer Tailwind canonical classes (`suggestCanonicalClasses`): important as a **suffix** (`text-black!`, not `!text-black`); use spacing scale instead of arbitrary px when equivalent (`mb-7.5` not `mb-[30px]`; `max-w-screen-2xl` not `max-w-[1536px]`)

## Structure

```
app/           # routes, layout, globals.css, providers
components/    # UI building blocks (Cards, Lists, Tags, Widgets, ui/)
layouts/       # page shells used by app routes
lib/utils.ts   # cn()
```

## Changes

- Match existing patterns; prefer small, focused diffs
- Do not redesign spacing, typography, or palette unless asked
- After UI changes, smoke-check key routes: `/`, `/products/`, product detail, news article
