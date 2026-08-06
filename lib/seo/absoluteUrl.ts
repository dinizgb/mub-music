import { getSiteConfig } from "lib/seo/siteConfig";

/**
 * Builds an absolute HTTPS URL.
 * Page paths get a trailing slash; file-like paths (e.g. `.xml`) do not.
 * @param {string} [path] Path relative to site root (optional; defaults to `/`).
 * @return {string} Absolute URL.
 */
export function absoluteUrl(path = "/"): string {
  const { domain } = getSiteConfig();
  let normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return `https://${domain}/`;
  }

  const lastSegment = normalized.split("/").filter(Boolean).pop() ?? "";
  const looksLikeFile = /\.[a-z0-9]+$/i.test(lastSegment);

  if (looksLikeFile) {
    normalized = normalized.replace(/\/+$/, "");
  } else if (!normalized.endsWith("/")) {
    normalized = `${normalized}/`;
  }

  return `https://${domain}${normalized}`;
}
