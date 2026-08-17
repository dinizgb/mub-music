/**
 * Serializes JSON for embedding inside a <script> tag.
 * Escapes `<`, U+2028, and U+2029 so CMS strings cannot break out of the script.
 * @param {unknown} data JSON-serializable value.
 * @return {string} Safe JSON text for dangerouslySetInnerHTML.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
