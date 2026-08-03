/**
 * Client helper for product search via the Next.js BFF.
 * @param {string} text Search text.
 * @param {AbortSignal} [signal] Optional abort signal for in-flight cancellation.
 * @return {Promise<any[]>} Matching product nodes (empty on error).
 */
export async function fetchSearchProducts(
  text: string,
  signal?: AbortSignal
): Promise<any[]> {
  const response = await fetch(
    `/api/search/products/?q=${encodeURIComponent(text)}`,
    signal ? { signal } : undefined
  );

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  return Array.isArray(data.products) ? data.products : [];
}
