/**
 * Builds a news article path from CMS slugs (with trailing slash).
 * @param {string} categorySlug Category slug.
 * @param {string} slug Article slug.
 * @return {string} Path.
 */
export function newsArticlePath(categorySlug: string, slug: string): string {
  return `/news/${categorySlug}/${slug}/`;
}

/**
 * Builds a product detail path from CMS slugs (with trailing slash).
 * @param {string} category Category slug.
 * @param {string} subcategory Subcategory slug.
 * @param {string} slug Product slug.
 * @return {string} Path.
 */
export function productDetailPath(
  category: string,
  subcategory: string,
  slug: string
): string {
  return `/products/${category}/${subcategory}/${slug}/`;
}

/**
 * Returns true when every expected slug matches the actual route param.
 * @param {string[]} expected CMS slugs in order.
 * @param {string[]} actual Route param slugs in order.
 * @return {boolean} Whether all segments match.
 */
export function slugsMatch(expected: string[], actual: string[]): boolean {
  if (expected.length !== actual.length) return false;
  return expected.every((value, index) => value === actual[index]);
}
