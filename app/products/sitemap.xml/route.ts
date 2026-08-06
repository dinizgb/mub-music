import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProducts from "services/graphql/queries/getAllProducts";
import { absoluteUrl } from "lib/seo/absoluteUrl";
import { QueryParameters } from "types/queryParams";

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

/**
 * Products sitemap route.
 * @return {Promise<Response>} XML sitemap.
 */
export async function GET() {
  let products: Array<{
    slug: string;
    product_info: {
      category: { slug: string };
      subcategory: { slug: string };
    };
  }> = [];

  try {
    const params: QueryParameters = { first: 200 };
    const result = await fetchQuery(getAllProducts(params));
    if (!result.notFound) {
      products = result.props.data.products.nodes;
    }
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
      `/products/${item.product_info.category.slug}/${item.product_info.subcategory.slug}/${item.slug}/`
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
