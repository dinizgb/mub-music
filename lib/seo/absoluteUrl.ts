import { getSiteConfig } from "lib/seo/siteConfig";

/**
 * Builds an absolute HTTPS URL without a trailing slash (except bare domain root).
 * File-like paths (e.g. `.xml`, images) keep their extension and never gain a slash.
 * @param {string} [path] Path relative to site root (optional; defaults to `/`).
 * @return {string} Absolute URL.
 */
export function absoluteUrl(path = "/"): string {
  const { domain } = getSiteConfig();
  let normalized = path.startsWith("/") ? path : `/${path}`;

  if (normalized === "/" || normalized === "") {
    return `https://${domain}`;
  }

  normalized = normalized.replace(/\/+$/, "");
  return `https://${domain}${normalized}`;
}
