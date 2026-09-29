import { QueryParameters } from "types/queryParams";
import formatGraphqlQueryParams from "utils/formatGraphqlQueryParams";

/**
 * Query to get the published products total.
 * @param {QueryParameters} props Query params.
 * @return {string} GraphQL query.
 */
export default function getProductsCount(props: QueryParameters) {
  const query = `
    query getProductsCount {
      products(${formatGraphqlQueryParams(props)}) {
        pageInfo {
          offsetPagination {
            total
          }
        }
      }
    }`;
  return query;
}
