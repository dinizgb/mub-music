# Mub Music — Project Rules

Single source of truth for coding conventions. Cursor and Claude configs point here.

## Stack

- **Next.js** App Router (`app/`), React 19, TypeScript
- **Styling:** Tailwind CSS v4 + local shadcn/ui primitives (`components/ui/`)
- **Do not** reintroduce Material UI, Emotion, or styled-components
- **Data:** Apollo Client + GraphQL on the **server only**; client state via Redux Toolkit where already used
- **Browser data:** call Next.js Route Handlers under `app/api/` — never import GraphQL services or Apollo into client components

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
- Prefer URLs **without** a trailing slash (`trailingSlash: false`); SEO canonicals use `absoluteUrl()` from `lib/seo/`

## Formatting & lint

- Prettier 3 with plugins (order matters): `prettier-plugin-tailwindcss`, `prettier-plugin-classnames`, `prettier-plugin-merge`
- Config: `.prettierrc` — `printWidth` 80; classnames plugin wraps long `className` strings
- ESLint: `react/react-in-jsx-scope` and `react/jsx-uses-react` are **off** (React 19 / Next JSX transform)
- Prefer Tailwind canonical classes (`suggestCanonicalClasses`): important as a **suffix** (`text-black!`, not `!text-black`); use spacing scale instead of arbitrary px when equivalent (`mb-7.5` not `mb-[30px]`; `max-w-screen-2xl` not `max-w-[1536px]`)

## Structure

```
app/           # routes, layout, globals.css, providers, api/
app/api/       # Route Handlers (BFF for browser clients)
components/    # UI building blocks (Cards, Lists, Tags, Widgets, ui/)
layouts/       # page shells used by app routes
lib/utils.ts   # cn()
lib/api/       # thin browser fetch helpers for /api/*
i18n/          # locale JSON + t() helper
services/      # server-side GraphQL + domain services (not for client imports)
__tests__/     # unit tests (mirrors source areas)
```

### API routes (BFF)

- Browser/client UI must use `fetch('/api/...')` (or helpers in `lib/api/`), not `services/graphql/*` or `services/search/*`.
- Route Handlers under `app/api/**/route.ts` call existing server services (`fetchQuery`, `searchProducts`, etc.).
- Server Components / `generateMetadata` / sitemaps keep calling `services/*` **directly** — do not round-trip through `/api`.
- Use server-only env `ENV_API_ROOT_PATH` for the GraphQL host (not `NEXT_PUBLIC_*` — GraphQL is never called from the browser).
- Use server-only env `ENV_MEDIA_ROOT_PATH` for the `next/image` remote hostname in `next.config.js`.
- Use server-only `ENV_API_USER` + `ENV_API_PASSWORD` for Basic auth on GraphQL requests from Apollo (never expose these to the browser).
- Example: `GET /api/search/products?q=` → [`app/api/search/products/route.ts`](app/api/search/products/route.ts)

## Testing (required)

Every new or substantially changed **component**, **utility/function**, **hook**, **i18n helper**, and **lib** module **must** ship with unit tests. Do not merge UI or logic without tests.

### Coverage bar

- Aim for **high coverage** on the new/changed file: prefer **≥ 90%** statements/branches/lines; **100%** when the module is small or branchy (utils, pure helpers, presentational components).
- Cover the happy path **and** meaningful branches (empty states, `null`/`[]`, primary vs secondary variants, interpolated i18n strings, edge ratings, etc.).
- If a branch is intentionally unreachable, say so in the PR; do not leave accidental gaps.

### Where tests live

Mirror the source area under `__tests__/`, with a flat file name matching the module (not nested by Cards/Lists/… unless needed later):

| Source                                         | Test file                                                     |
| ---------------------------------------------- | ------------------------------------------------------------- |
| `components/Lists/BigHorizontalCardList.tsx`   | `__tests__/components/BigHorizontalCardList.test.tsx`         |
| `components/Widgets/StarsWidget.tsx`           | `__tests__/components/StarsWidget.test.tsx`                   |
| `utils/formatDate.ts`                          | `__tests__/utils/formatDate.test.ts`                          |
| `i18n/index.ts`                                | `__tests__/i18n/t.test.ts`                                    |
| `lib/utils.ts`                                 | `__tests__/lib/utils.test.ts`                                 |
| `layouts/LayoutHomePage.tsx`                   | `__tests__/layouts/LayoutHomePage.test.tsx`                   |
| `services/filters/productFilterConstructor.ts` | `__tests__/services/filters/productFilterConstructor.test.ts` |
| `services/graphql/queries/getAllNews.tsx`      | `__tests__/services/graphql/queries/getAllNews.test.ts`       |
| `app/api/search/products/route.ts`             | `__tests__/api/searchProducts.route.test.ts`                  |
| `services/search/handleSearchProducts.ts`      | `__tests__/api/searchProducts.route.test.ts`                  |
| `lib/api/searchProducts.ts`                    | `__tests__/lib/searchProducts.test.ts`                        |

- Filename: `{ModuleName}.test.ts` or `{ModuleName}.test.tsx` (use `.tsx` when rendering React).
- Shared fixtures: `__tests__/__mocks__/` (e.g. `postListMock.ts`, `productListMock.ts`). That folder is **ignored** by Jest as a test suite — only import from it.
- Do **not** put tests next to source (`components/**/*.test.tsx`) unless the project later standardizes on that; today’s convention is `__tests__/…`.

### What to assert

- **Utils:** inputs → outputs; equal/duplicate/empty cases; interpolations (`t()`, pagination, URL params).
- **Components:** rendered text/roles, key `href`s, empty/loading states, variant props (`isPrimaryTitle`, `withBackground`, `fontSize`, etc.). Prefer `@testing-library/react` queries (`getByRole`, `getByText`) over brittle class-only checks when possible.
- Prefer i18n keys’ values via `i18n.*` in expectations when the UI uses translations — avoid duplicating raw copy in tests when the string already lives in `i18n/us-en.json`.

### Tooling & setup

- Runner: Jest (`npm test` / `npm test -- --coverage`). Config: `jest.config.js` + `jest.setup.ts`.
- React Testing Library v16+ (React 19). Path alias `@/*` is mapped in Jest.
- Avatar (and similar Radix-heavy UI) may be mocked in `jest.setup.ts` when unit tests do not need the real primitive.
- Run coverage for touched files before claiming done; fix failures before commit (husky runs the project checks).

### Exceptions

- Pure re-exports, generated files, or one-line Next config — no test required.
- Heavy page shells that need Apollo/Redux/router can start with focused unit tests of extracted pure logic + lighter component tests with mocked providers; still add **some** coverage, do not skip entirely.

## Changes

- Match existing patterns; prefer small, focused diffs
- Do not redesign spacing, typography, or palette unless asked
- After UI changes, smoke-check key routes: `/`, `/products/`, product detail, news article
- New modules must include tests under `__tests__/` as described above
