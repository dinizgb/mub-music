# Filter empty product categories

**Date:** 2026-08-03  
**Status:** Approved for planning (pending user review of this spec)

## Problem

Product categories are listed on `/products/` and in the mobile menu (via `Header` on nearly every page). Categories with **zero products linked directly** still appear, which leads to empty category pages and dead navigation links.

## Goals

- Hide categories that have no products linked directly to them (`product_info.category`).
- Apply this filter **everywhere** categories feed the UI: `/products/` grid and mobile menu on all pages.
- Keep the existing Redux/mobile-menu UX unchanged aside from the shorter category list.
- Update the `/products/` “items found” count to reflect the filtered list length.

## Non-goals

- Filtering subcategories.
- CMS / WPGraphQL schema changes (no new `count` field on `ProductCategory`).
- Redis / distributed caching of category existence.
- Redesigning the products index or mobile menu UI.

## Background / schema constraint

Approach “extend `getAllProductCategories` with a count” was tried against `https://wp.mubmusic.com/graphql`.

- `ProductCategory` exposes CPT fields + `product_category_info.thumbnail` only.
- There is **no** `count` and **no** `products` connection on `ProductCategory`.
- Existence can be measured with the existing products query:

  `products(where: { catSlug: "<slug>", offsetPagination: { size: 1, offset: 0 } }) { pageInfo { offsetPagination { total } } }`

- Today there are ~18 categories; parallel lightweight checks are acceptable.

## Solution

### Shared server helper

Add `services/products/getProductCategoriesWithProducts.ts` (name may vary slightly to match repo conventions) that:

1. Fetches all product categories with the existing `getAllProductCategories` query (`size: 100` is enough for current volume).
2. For each category slug, runs a lightweight products query with `catSlug` + `size: 1`.
3. Keeps categories where `pageInfo.offsetPagination.total > 0`.
4. Returns `{ categories, totalCount }` where `totalCount` is the filtered length.

Existence checks run with `Promise.all` (bounded by category count ~18). Failures for a single slug treat that category as empty (omit it) and do not fail the whole page, unless the initial categories fetch itself fails (`notFound` / existing `fetchQuery` behavior).

### Call-site wiring

Replace direct “fetch all categories → pass to Header / layout” usage with the helper at every page that currently loads categories for navigation or the products index:

- `app/page.tsx`
- `app/products/page.tsx` (grid + Header; `totalCount` = filtered length)
- `app/products/[category]/page.tsx`
- `app/products/[category]/[subcategory]/page.tsx`
- `app/products/[category]/[subcategory]/[slug]/page.tsx`
- `app/news/page.tsx`
- `app/news/[category]/page.tsx`
- `app/news/[category]/[slug]/page.tsx`

No UI component API changes required: `Header` / `Nav` / `MobileMenu` / `LayoutProductCategoryList` keep receiving `ProductsCategoriesType[]`.

### Query support

Add a minimal GraphQL query helper (or reuse a thin products query) that only requests:

```graphql
products(where: { catSlug, offsetPagination: { size: 1, offset: 0 } }) {
  pageInfo {
    offsetPagination {
      total
    }
  }
}
```

Do not pull product nodes for the existence check.

### Types

No required change to `ProductsCategoriesType` for rendering. Internal helper types may include `{ categories: ProductsCategoriesType[]; totalCount: number }`.

## Error handling

| Case                                   | Behavior                                          |
| -------------------------------------- | ------------------------------------------------- |
| Categories query `notFound` / error    | Existing page `notFound()` / error path unchanged |
| Single `catSlug` existence query fails | Omit that category; continue                      |
| All categories empty after filter      | Render empty list (valid state)                   |

## Testing

- Unit test the helper: mock `fetchQuery` / products totals; assert empty categories are dropped and non-empty kept; assert `totalCount` matches filtered length.
- Unit test the lightweight products-total query builder (string contains `catSlug` / `pageInfo`).
- Update any page-level tests that assume unfiltered category lists, if present.

## Verification

- Locally or against staging: categories with `total === 0` (e.g. historically `cables`, `software`) do not appear on `/products/` or in the mobile menu.
- Categories with products (e.g. `electric-guitars`) still appear.
- `npm test` for touched suites; `npm run check-types`.

## Decision log

| Decision      | Choice                                                         |
| ------------- | -------------------------------------------------------------- |
| Empty means   | Zero products linked **directly** to the category              |
| Scope         | Filter everywhere categories are shown                         |
| Count source  | `products(where: { catSlug }).pageInfo.offsetPagination.total` |
| Strategy      | Parallel per-slug total checks (not a full products scan)      |
| Schema change | Out of scope; revisit if WP adds a count connection later      |
