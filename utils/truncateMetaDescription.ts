/**
 * Truncates SEO meta description text at the first period, capped at 155 chars.
 * If the first "." falls after character 155 (or there is no "." and text is longer),
 * cuts at 152 characters and appends "...".
 * @param {string} text Raw description text.
 * @return {string} Truncated description.
 */
export default function truncateMetaDescription(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";

  const periodIndex = trimmed.indexOf(".");
  if (periodIndex !== -1 && periodIndex < 155) {
    return trimmed.slice(0, periodIndex + 1);
  }

  if (trimmed.length <= 155) {
    return trimmed;
  }

  return `${trimmed.slice(0, 152)}...`;
}
