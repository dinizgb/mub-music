export type PaginationItem = number | "...";

/**
 * Builds the page numbers and ellipses shown in the pagination widget.
 * @param {number} currentPage Active 1-based page.
 * @param {number} totalPages Total number of pages.
 * @param {number} [siblingCount=2] Pages to show on each side of the current page.
 * @return {PaginationItem[]} Page numbers and ellipsis markers.
 */
export function buildPaginationItems(
  currentPage: number,
  totalPages: number,
  siblingCount = 2
): PaginationItem[] {
  if (totalPages <= 1) {
    return [];
  }

  if (totalPages <= 9) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const showLeftEllipsis = currentPage > siblingCount + 2;
  const showRightEllipsis = currentPage < totalPages - siblingCount - 1;
  const start = showLeftEllipsis ? Math.max(2, currentPage - siblingCount) : 2;
  const end = showRightEllipsis
    ? Math.min(totalPages - 1, currentPage + siblingCount)
    : totalPages - 1;

  const items: PaginationItem[] = [1];
  if (showLeftEllipsis) {
    items.push("...");
  }
  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }
  if (showRightEllipsis) {
    items.push("...");
  }
  items.push(totalPages);
  return items;
}
