/**
 * Builds getAllNews params for one news sitemap page (first/after).
 * @param {number} pageSize Page size.
 * @param {string | null} after Cursor from the previous page.
 * @return {object} GraphQL connection args with first and optional after.
 */
export function newsSitemapPageParams(
  pageSize: number,
  after: string | null
): { first: number; after?: string } {
  return after ? { first: pageSize, after } : { first: pageSize };
}
