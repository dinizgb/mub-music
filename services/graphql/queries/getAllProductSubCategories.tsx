import { QueryParameters } from "types/queryParams";
import formatGraphqlQueryParams from "utils/formatGraphqlQueryParams";

/**
 * Query to get All Product Subcategories.
 * @param {QueryParameters} props to the query.
 * @return {string}: With the query.
 */
export default function getAllProductSubCategories(props: QueryParameters) {
  const getAllProductSubCategoriesQuery = `
    query getAllProductSubCategories {
      prodSubCategories(${formatGraphqlQueryParams(props)}) {
        nodes {
          id
          slug
          title
        }
      }
    }`;
  return getAllProductSubCategoriesQuery;
}
