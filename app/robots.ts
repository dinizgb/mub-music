import { absoluteUrl } from "lib/seo/absoluteUrl";

/**
 * Robots.txt for App Router.
 * @return {object} Robots metadata rules.
 */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/preview/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
