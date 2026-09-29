/**
 * Reads ACF GraphQL group fields, ignoring metadata like __typename.
 * @param {object | null | undefined} group ACF group object.
 * @return {T[]} Nested field values that are objects.
 */
export function acfGroupItems<T extends object = Record<string, unknown>>(
  group?: object | null
): T[] {
  if (!group) {
    return [];
  }

  return Object.values(group).filter(
    (value): value is T => Boolean(value) && typeof value === "object"
  );
}
