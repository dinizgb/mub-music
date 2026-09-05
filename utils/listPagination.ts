export const NEWS_LIST_PAGE_SIZE = 5;

/**
 * Resolves a 1-based page query param into a page number and item offset.
 * @param {string | undefined} page Page query string.
 * @param {number} pageSize Items per page.
 * @return {{currentPage: number, offset: number}} Page and offset.
 */
export function paginationFromSearchParam(
  page: string | undefined,
  pageSize: number
): { currentPage: number; offset: number } {
  const parsed = parseInt(page ?? "1", 10);
  const currentPage = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  return {
    currentPage,
    offset: (currentPage - 1) * pageSize,
  };
}
