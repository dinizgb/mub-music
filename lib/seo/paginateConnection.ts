export type ConnectionPage<T> = {
  nodes: T[];
  hasNextPage: boolean;
  endCursor: string | null;
};

/**
 * Fetches WPGraphQL connection pages via first/after until exhausted.
 * @param {function} fetchPage Callback receiving pageSize and after cursor.
 * @param {number} [pageSize=200] Page size.
 * @param {number} [maxPages=50] Safety cap on page count.
 * @return {Promise<T[]>} Concatenated nodes.
 */
export async function paginateConnection<T>(
  fetchPage: (
    pageSize: number,
    after: string | null
  ) => Promise<ConnectionPage<T>>,
  pageSize = 200,
  maxPages = 50
): Promise<T[]> {
  const all: T[] = [];
  let after: string | null = null;

  for (let page = 0; page < maxPages; page += 1) {
    const { nodes, hasNextPage, endCursor } = await fetchPage(pageSize, after);
    all.push(...nodes);
    if (!hasNextPage || !endCursor || nodes.length === 0) {
      break;
    }
    after = endCursor;
  }

  return all;
}
