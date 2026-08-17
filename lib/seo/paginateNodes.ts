/**
 * Fetches GraphQL connection pages until a short page or maxPages.
 * @param {function} fetchPage Callback receiving pageSize and offset.
 * @param {number} [pageSize=200] Page size.
 * @param {number} [maxPages=50] Safety cap on page count.
 * @return {Promise<T[]>} Concatenated nodes.
 */
export async function paginateNodes<T>(
  fetchPage: (pageSize: number, offset: number) => Promise<T[]>,
  pageSize = 200,
  maxPages = 50
): Promise<T[]> {
  const all: T[] = [];

  for (let page = 0; page < maxPages; page += 1) {
    const offset = page * pageSize;
    const nodes = await fetchPage(pageSize, offset);
    all.push(...nodes);
    if (nodes.length < pageSize) {
      break;
    }
  }

  return all;
}
