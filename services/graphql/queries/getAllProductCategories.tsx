import { QueryParameters } from "types/queryParams";
import formatGraphqlQueryParams from "utils/formatGraphqlQueryParams";
/**
 * Query to get All Product Categories.
 * @param {QueryParameters} props to the component.
 * @return {string}: With the query.
 */
export default function getAllProductCategories(props: QueryParameters) {
  const getAllProductCategoriesQuery = `
    query getAllProductCategories {
      productCategories(${formatGraphqlQueryParams(props)}) {
        nodes {
          id
          slug
          title
          product_category_info {
            thumbnail {
              altText
              sourceUrl(size: LARGE)
            }
          }
        }
        pageInfo {
          offsetPagination {
            hasMore
            hasPrevious
            total
          }
        }
      }
    }`;
  return getAllProductCategoriesQuery;
}
