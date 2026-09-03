import { absoluteUrl } from "lib/seo/absoluteUrl";

export const revalidate = 86400;

/**
 * Static pages sitemap.
 * @return {Promise<Response>} XML sitemap.
 */
export async function GET() {
  const urls = ["/", "/news", "/products", "/privacy-policy"];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(sitemap, {
    headers: {
      "Cache-Control":
        "max-age=86400, s-maxage=86400, stale-while-revalidate=86430",
      "Content-Type": "text/xml",
    },
  });
}
