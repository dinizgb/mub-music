/**
 * Parses a comma-separated product ID list, including HTML from CMS content.
 * @param {string | null | undefined} raw Raw ID list.
 * @return {number[]} Positive integer IDs in the given order.
 */
export default function parseProductIds(
  raw: string | null | undefined
): number[] {
  if (!raw) {
    return [];
  }

  return raw
    .replace(/<[^>]+>/g, " ")
    .split(",")
    .map((part) => Number.parseInt(part.trim(), 10))
    .filter((id) => Number.isInteger(id) && id > 0);
}

/**
 * Returns items in the order of `ids`, skipping IDs that have no match.
 * @param {T[]} items Items that include a numeric id.
 * @param {number[]} ids Desired id order.
 * @param {(item: T) => number} getId Reads the item id.
 * @return {T[]} Ordered items.
 */
export function orderItemsByIds<T>(
  items: T[],
  ids: number[],
  getId: (item: T) => number
): T[] {
  const byId = new Map(items.map((item) => [getId(item), item]));
  return ids.flatMap((id) => {
    const item = byId.get(id);
    return item ? [item] : [];
  });
}
