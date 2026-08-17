import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProducts from "services/graphql/queries/getAllProducts";
import { absoluteUrl } from "lib/seo/absoluteUrl";
import { paginateNodes } from "lib/seo/paginateNodes";
import { productDetailPath } from "lib/seo/routeSlugs";

export const revalidate = 3600;

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

type ProductSitemapNode = {
  slug: string;
  product_info: {
    category: { slug: string };
    subcategory: { slug: string };
  };
};

/**
 * Products sitemap route.
 * @return {Promise<Response>} XML sitemap.
 */
export async function GET() {
  let products: ProductSitemapNode[] = [];

  try {
    products = await paginateNodes(async (pageSize, offset) => {
      const result = await fetchQuery(
        getAllProducts({
          where: { offsetPagination: { size: pageSize, offset } },
        })
      );
      if (result.notFound) return [];
      return result.props.data.products.nodes as ProductSitemapNode[];
    });
  } catch {
    products = [];
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${products
  .filter(
    (item) =>
      item?.slug &&
      item?.product_info?.category?.slug &&
      item?.product_info?.subcategory?.slug
  )
  .map((item) => {
    const loc = absoluteUrl(
      productDetailPath(
        item.product_info.category.slug,
        item.product_info.subcategory.slug,
        item.slug
      )
    );
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control":
        "max-age=3600, s-maxage=3600, stale-while-revalidate=3599",
    },
  });
}
