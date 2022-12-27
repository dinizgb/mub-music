import { QueryParameters } from "types/queryParams";
import formatGraphqlQueryParams from "utils/formatGraphqlQueryParams";

/**
 * Query to get Product Categories by Slug.
 * @param {QueryParameters} props to the component.
 * @return {string}: With the query.
 */
export default function getProductCategoryBy(props: QueryParameters) {
  const query = `
    query getProductCategoryBy {
      productCategoryBy(${formatGraphqlQueryParams(props)}) {
        id
        slug
        title(format: RENDERED)
      }
    }`;
  return query;
}
