import { searchProducts } from "services/search/searchProducts";
import { isSearchRateLimited } from "services/search/searchRateLimit";

const MAX_QUERY_LENGTH = 200;

export type SearchProductsResponse = { products: any[] } | { error: string };

type HandleSearchProductsOptions = {
  clientKey?: string;
};

/**
 * Core product search handler used by the API route.
 * @param {string | null} rawQuery Raw `q` query param.
 * @param {HandleSearchProductsOptions} [options] Optional rate-limit client key.
 * @return {Promise<{status: number, body: SearchProductsResponse}>} HTTP status and body.
 */
export async function handleSearchProducts(
  rawQuery: string | null,
  options: HandleSearchProductsOptions = {}
): Promise<{
  status: number;
  body: SearchProductsResponse;
}> {
  const clientKey = options.clientKey ?? "local";

  if (isSearchRateLimited(clientKey)) {
    return {
      status: 429,
      body: { error: "Too many requests" },
    };
  }

  const q = rawQuery?.trim() ?? "";

  if (!q || q.length > MAX_QUERY_LENGTH) {
    return {
      status: 400,
      body: { error: "Invalid search query" },
    };
  }

  try {
    const result = await searchProducts(q);

    if (result.notFound || !result.props) {
      return { status: 200, body: { products: [] } };
    }

    return {
      status: 200,
      body: {
        products: result.props.data.products.nodes ?? [],
      },
    };
  } catch {
    return {
      status: 500,
      body: { error: "Search failed" },
    };
  }
}
