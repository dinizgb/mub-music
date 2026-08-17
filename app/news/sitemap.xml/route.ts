import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import { i18n } from "@/i18n";
import { absoluteUrl } from "lib/seo/absoluteUrl";
import { paginateConnection } from "lib/seo/paginateConnection";
import { newsArticlePath } from "lib/seo/routeSlugs";
import { newsSitemapPageParams } from "lib/seo/newsSitemapPageParams";

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

type NewsSitemapNode = {
  slug?: string;
  date?: string;
  modified?: string;
  title?: string | { rendered?: string };
  featuredImage?: { node?: { sourceUrl?: string } };
  categories?: { nodes?: Array<{ slug?: string }> };
};

/**
 * News sitemap route.
 * Uses WPGraphQL first/after cursor pagination (verified against live CMS).
 * @return {Promise<Response>} XML news sitemap.
 */
export async function GET() {
  let lastNewsResponse: NewsSitemapNode[] = [];
  try {
    lastNewsResponse = await paginateConnection(async (pageSize, after) => {
      const lastNews = await fetchQuery(
        getAllNews(newsSitemapPageParams(pageSize, after))
      );
      if (lastNews.notFound) {
        return { nodes: [], hasNextPage: false, endCursor: null };
      }
      const posts = lastNews.props.data.posts;
      return {
        nodes: (posts.nodes ?? []) as NewsSitemapNode[],
        hasNextPage: Boolean(posts.pageInfo?.hasNextPage),
        endCursor: posts.pageInfo?.endCursor ?? null,
      };
    });
  } catch {
    lastNewsResponse = [];
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        ${lastNewsResponse
          .filter((item) => item?.slug && item?.categories?.nodes?.[0]?.slug)
          .map((item) => {
            const { slug, categories, date, modified, title, featuredImage } =
              item;
            const featuredMediaUrl = featuredImage?.node?.sourceUrl;
            let img = "";
            if (featuredMediaUrl) {
              img = `<image:image><image:loc>${escapeXml(
                featuredMediaUrl
              )}</image:loc></image:image>`;
            }
            const newsTitle =
              typeof title === "string" ? title : (title?.rendered ?? "");
            const categorySlug = categories!.nodes![0].slug!;
            return `
                <url>
                    <loc>${escapeXml(
                      absoluteUrl(newsArticlePath(categorySlug, slug!))
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
