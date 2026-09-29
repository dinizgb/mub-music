import { QueryParameters } from "types/queryParams";
import formatGraphqlQueryParams from "utils/formatGraphqlQueryParams";

/**
 * Query to get featured offer posts (home curated product IDs).
 * @param {QueryParameters} props Query params.
 * @return {string} GraphQL query.
 */
export default function getFeaturedOffers(props: QueryParameters) {
  const query = `
    query getFeaturedOffers {
      featuredOffers(${formatGraphqlQueryParams(props)}) {
        nodes {
          id
          slug
          title(format: RENDERED)
          content(format: RENDERED)
        }
      }
    }`;
  return query;
}
