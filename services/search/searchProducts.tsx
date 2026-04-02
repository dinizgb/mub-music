// SERVICES
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllSearchProducts from "services/graphql/queries/getAllSearchProducts";
// TYPES
import { QueryParameters } from "types/queryParams";

/**
 * Function to handle Search.
 * @param {string} text with the search text.
 * @return {TSX.Element}: With the search result.
 */
export async function searchProducts(text: string) {
  const searchParams: QueryParameters = {
    first: 10,
    where: { search: text },
  };
  const searchProducts = await fetchQuery(getAllSearchProducts(searchParams));
  const searchProductsResponse = searchProducts;
  return searchProductsResponse;
}
