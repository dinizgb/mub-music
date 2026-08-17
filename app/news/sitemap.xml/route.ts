import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import { QueryParameters } from "types/queryParams";
import { i18n } from "@/i18n";
import { absoluteUrl } from "lib/seo/absoluteUrl";

export const revalidate = 60;

/**
 * Escapes XML special characters.
 * @param {string} value Raw string.
 * @return {string} Escaped string.
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * News sitemap route.
 * @return {Promise<Response>} XML news sitemap.
 */
export async function GET() {
  let lastNewsResponse: any[] = [];
  try {
    const newsParams: QueryParameters = {
      first: 200,
    };
    const lastNews = await fetchQuery(getAllNews(newsParams));
    lastNewsResponse = lastNews.notFound ? [] : lastNews.props.data.posts.nodes;
  } catch {
    lastNewsResponse = [];
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        ${lastNewsResponse
          .filter((item) => item?.slug && item?.categories?.nodes?.[0]?.slug)
          .map((item) => {
            const {
              slug,
              categories,
              date,
              modified,
              title,
              featuredImage,
            } = item;
            const featuredMediaUrl = featuredImage?.node?.sourceUrl;
            let img = "";
            if (featuredMediaUrl) {
              img = `<image:image><image:loc>${escapeXml(
                featuredMediaUrl
              )}</image:loc></image:image>`;
            }
            const newsTitle =
              typeof title === "string" ? title : (title?.rendered ?? "");
            return `
                <url>
                    <loc>${escapeXml(
                      absoluteUrl(`/news/${categories.nodes[0].slug}/${slug}`)
                    )}</loc>
                    <news:news>
                        <news:publication>
                            <news:name>${escapeXml(i18n.meta.siteName)}</news:name>
                            <news:language>en</news:language>
                        </news:publication>
                        <news:publication_date>${date}</news:publication_date>
                        <news:title>${escapeXml(newsTitle)}</news:title>
                    </news:news>
                    ${img}
                    <lastmod>${modified}</lastmod>
                </url>
                `;
          })
          .join("")}
    </urlset>
    `;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "max-age=60, s-maxage=60, stale-while-revalidate=59",
    },
  });
}
