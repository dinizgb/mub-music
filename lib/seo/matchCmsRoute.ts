import { slugsMatch } from "lib/seo/routeSlugs";

type NewsLike = {
  slug?: string;
  categories?: { nodes?: Array<{ slug?: string }> };
};

type ProductLike = {
  slug?: string;
  product_info?: {
    category?: { slug?: string };
    subcategory?: { slug?: string };
  };
};

type AuthorLike =
  | {
      name?: string;
      node?: { name?: string };
    }
  | null
  | undefined;

/**
 * Returns true when route params match the article's CMS category and slug.
 * @param {NewsLike} article CMS article.
 * @param {string} category Route category slug.
 * @param {string} slug Route article slug.
 * @return {boolean} Whether the route is valid for this article.
 */
export function articleMatchesRoute(
  article: NewsLike,
  category: string,
  slug: string
): boolean {
  const categorySlug = article.categories?.nodes?.[0]?.slug;
  const articleSlug = article.slug;
  if (!categorySlug || !articleSlug) return false;
  return slugsMatch([categorySlug, articleSlug], [category, slug]);
}

/**
 * Returns true when route params match the product's CMS category path.
 * @param {ProductLike} product CMS product.
 * @param {string} category Route category slug.
 * @param {string} subcategory Route subcategory slug.
 * @param {string} slug Route product slug.
 * @return {boolean} Whether the route is valid for this product.
 */
export function productMatchesRoute(
  product: ProductLike,
  category: string,
  subcategory: string,
  slug: string
): boolean {
  const cmsCategory = product.product_info?.category?.slug;
  const cmsSubcategory = product.product_info?.subcategory?.slug;
  const productSlug = product.slug;
  if (!cmsCategory || !cmsSubcategory || !productSlug) return false;
  return slugsMatch(
    [cmsCategory, cmsSubcategory, productSlug],
    [category, subcategory, slug]
  );
}

/**
 * Resolves a display/author name from WPGraphQL author shapes.
 * @param {AuthorLike} author Author field from postBy/posts.
 * @param {string} fallback Fallback when name is missing.
 * @return {string} Author display name.
 */
export function resolveAuthorName(
  author: AuthorLike,
  fallback: string
): string {
  return author?.node?.name || author?.name || fallback;
}
