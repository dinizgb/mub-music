# SEO Fixes Design — mub-music

**Date:** 2026-08-06  
**Status:** Approved for implementation planning  
**Approach:** Metadata-first rebuild (App Router Metadata API + shared helpers + real JSON-LD)

## Goal

Full technical SEO pass: fix known home canonical/description issues, then harden metadata, sitemaps, structured data, headings, and robots across the site. Deliver as an implementation plan first (audit → spec → plan → code).

## Decisions (from brainstorm)

| Topic                 | Decision                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Scope                 | Full technical SEO (metadata, canonicals, OG/Twitter, JSON-LD, sitemaps, headings, robots, not-found)              |
| Home meta description | Use existing headline: “Reviews, Offers, Specs and much more! Find everything you need about any musical product!” |
| Home `<title>`        | Brand + short tagline: `Mub Music \| Reviews, Offers & Specs` (absolute)                                           |
| Canonical mismatch    | Preferred URL has **no** trailing slash (`https://mubmusic.com`, `trailingSlash: false`) |
| Architecture          | Metadata API only; delete unused `*SEOConstructor` components                                                      |
| JSON-LD               | Real Product / NewsArticle / BreadcrumbList from CMS data; never ship hardcoded fake Product schema                |

## Preferred URL policy

- Apex host: `https://mubmusic.com` (no `www` in app-generated URLs).
- No trailing slash on public paths (matches `next.config.js` `trailingSlash: false`).
- Canonical, Open Graph `url`, and sitemap `<loc>` values omit trailing slashes (`https://mubmusic.com`, `https://mubmusic.com/news`).
- Trailing-slash requests should redirect to the non-slash form (verify Next + hosting; do not serve both as 200).
- `www` → apex redirect is an ops/DNS checklist item if not already configured; out of app scope beyond documenting it.

## Architecture

### Single source of truth

All crawlable meta comes from the Next.js Metadata API (`metadata` / `generateMetadata`). No raw `<meta>` / `<link rel="canonical">` from legacy constructors.

### Shared module (`lib/seo/`)

New code lives under `lib/seo/`. Legacy files under `services/SEO/` are deleted after migration (except anything still imported elsewhere, which should be moved into `lib/seo/` first).

| Unit                    | Responsibility                                                   |
| ----------------------- | ---------------------------------------------------------------- |
| `siteConfig.ts`         | `siteName`, domain from `NEXT_PUBLIC_ENV_DOMAIN`, `metadataBase` |
| `absoluteUrl.ts`        | `https://{domain}{path}` with normalized trailing slash          |
| `buildPageMetadata.ts`  | Shared title, description, canonical, Open Graph, Twitter shape  |
| `jsonld/product.ts`     | Product schema from live `ProductType`                           |
| `jsonld/newsArticle.ts` | NewsArticle from post fields                                     |
| `jsonld/breadcrumb.ts`  | BreadcrumbList from typed items                                  |
| `JsonLd.tsx`            | Server Component rendering `application/ld+json`                 |

Root `app/layout.tsx` sets `metadataBase` from `siteConfig`.

Missing `NEXT_PUBLIC_ENV_DOMAIN` must fail loudly in build/dev (assert in `siteConfig`); never emit `https://undefined/...`.

### Per-route metadata

| Route                   | Title                                            | Description                                         | Notes                                                      |
| ----------------------- | ------------------------------------------------ | --------------------------------------------------- | ---------------------------------------------------------- |
| `/`                     | Absolute: `Mub Music \| Reviews, Offers & Specs` | Home headline copy                                  | OG image: `/images/home-art.png` (not the small logo icon) |
| `/news/`, `/products/`  | i18n titles                                      | i18n descriptions                                   | Full OG + Twitter                                          |
| News/product categories | Real display names (not `SLUG.toUpperCase()`)    | CMS or i18n template                                | Canonical without query params                             |
| Article                 | Post title                                       | HTML-stripped excerpt                               | `openGraph.type: article` + times/image                    |
| Product                 | Product title                                    | Stripped `product_info.description`, fallback title | Product richness primarily in JSON-LD                      |

Query params (`?page=`, `?brand=`): canonical always the clean path. No `noindex` on filtered views in this pass (canonicalize only).

### JSON-LD

Rendered from Server Components on the page (not via deleted constructors).

- **Product page:** Product + BreadcrumbList.
- **Article page:** NewsArticle + BreadcrumbList.
- **List/category pages:** BreadcrumbList only.

**Product schema rules:** include name, description, image; include `brand` only if present; include `offers` / `aggregateRating` / `review` only from real data; omit GTIN and other fields when unknown. Never invent values.

### Cleanup

Delete (and remove tests for):

- `SEOTagsConstructor`
- `ProductPageSEOConstructor`
- `SinglePageSEOConstructor`
- `CategoryPageSEOConstructor`

Drop unused `seoData` props that existed only to feed those tags (keep visible page title/excerpt props if still needed for UI). Keep `htmlTagCleaner` and a thin `JsonLd` helper.

### Sitemaps & robots

- `/sitemap.xml` index → `news`, `products`, and static URLs (home, `/news/`, `/products/`) via a static sitemap or inline static entries.
- `/news/sitemap.xml` — keep Google News extensions; increase coverage beyond first 50 (paginate GraphQL or split sitemaps if needed). Escape XML entities; skip items missing category slug.
- `/products/sitemap.xml` — new; product detail URLs with trailing slash.
- Replace hardcoded `public/robots.txt` with `app/robots.ts` using `absoluteUrl` for the sitemap loc. Keep `Disallow: /preview/` if still relevant.

### Heading hierarchy (P2)

- Article main title: change `H2` → `H1` (product page already uses `H1`).
- Products/news list pages: one `H1` for the page title; section labels remain `H2`.
- Home: ensure a single visible `H1` in the hero/search area; section headings stay `H2`.

### Not-found

Add `app/not-found.tsx` with `robots: { index: false }`.

## Prioritized fix list

### P0 — Correctness / crawl trust

1. Home meta description: replace “Mub Music is on the way…” with headline copy.
2. Home title: `Mub Music | Reviews, Offers & Specs`.
3. Canonical / trailing-slash consistency: preferred URL with slash; redirect non-slash; all generated URLs via `absoluteUrl`.
4. `metadataBase` + domain assert (no `undefined` host).

### P1 — Coverage & richness

5. Product meta description from real description (fallback title).
6. Category/subcategory titles from display names.
7. Open Graph + Twitter on home, news, products, and category pages.
8. Real JSON-LD on product and article pages (+ breadcrumbs on lists).
9. Sitemap index expansion: static + news + products; broader news/product coverage.

### P2 — Hygiene

10. Heading hierarchy fixes (article/list/home H1).
11. Delete dead constructors and fake Product schema.
12. `app/robots.ts` from shared domain helper.
13. `not-found` with `noindex`.

## Error handling

- `generateMetadata` when entity missing: minimal `{ title }` then page `notFound()`.
- Sitemap upstream failures: empty/partial urlset when possible; avoid hard 500s for transient GraphQL failures if feasible.
- Empty CMS description fields: i18n or title fallbacks; never empty meta description when a fallback exists.

## Testing

- Unit tests: `absoluteUrl`, `siteConfig` assert, metadata helpers, JSON-LD builders (omit-empty-field cases).
- Remove/replace constructor tests.
- Assert home title/description strings in metadata config or dedicated test.
- Manual: `https://mubmusic.com` → redirect to `/`; view-source canonical equals preferred URL; rich results / schema sanity on one product and one article.

## Out of scope

- Multi-locale / hreflang.
- Core Web Vitals / font loading overhaul.
- `noindex` for filtered product listings (future option).
- CDN/`www` redirect configuration beyond documenting the preferred host.

## Success criteria

- Home SERP title/description match approved copy.
- Auditing the apex URL without a trailing slash no longer reports a conflicting canonical once redirect + preferred URL align (or auditor follows redirect to the slash URL).
- No `https://undefined` URLs in HTML or sitemaps when env is set.
- Product and article pages expose valid JSON-LD without fabricated offers/reviews.
- Sitemaps discover home, news, and product URLs.
- Old SEO constructors are gone; Metadata API is the only meta tag source.
