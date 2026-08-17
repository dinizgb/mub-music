import { getSiteConfig } from "lib/seo/siteConfig";

const FILE_PATH_PATTERN = /\.[a-z0-9]+$/i;

/**
 * Builds an absolute HTTPS URL with a trailing slash for public paths.
 * File-like paths (e.g. `.xml`, images) keep their extension and never gain a slash.
 * @param {string} [path] Path relative to site root (optional; defaults to `/`).
 * @return {string} Absolute URL.
 */
export function absoluteUrl(path = "/"): string {
  const { domain } = getSiteConfig();
  let normalized = path.startsWith("/") ? path : `/${path}`;

  if (normalized === "/" || normalized === "") {
    return `https://${domain}/`;
  }

  normalized = normalized.replace(/\/+$/, "");

  if (FILE_PATH_PATTERN.test(normalized)) {
    return `https://${domain}${normalized}`;
  }

  return `https://${domain}${normalized}/`;
}
