export const revalidate = 86400;

/**
 * Sitemap index route.
 * @return {Promise<Response>} XML sitemap index.
 */
export async function GET() {
  const sitemaps = ["news"];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps
      .map(
        (item) =>
          `<sitemap>
            <loc>https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/${item}/sitemap.xml</loc>
        </sitemap>`
      )
      .join("")}
</sitemapindex>
`;

  return new Response(sitemap, {
    headers: {
      "Cache-Control":
        "max-age=86400, s-maxage=86400, stale-while-revalidate=86430",
      "Content-Type": "text/xml",
    },
  });
}
