import { QueryParameters } from "types/queryParams";
import formatGraphqlQueryParams from "utils/formatGraphqlQueryParams";

/**
 * Query to get All Search Products.
 * @param {QueryParameters} props to the component.
 * @return {string}: With the query.
 */
export default function getAllSearchProducts(props: QueryParameters) {
  const query = `
    query getAllSearchProducts {
      products(${formatGraphqlQueryParams(props)}) {
        nodes {
          id
          slug
          title(format: RENDERED)
          product_info {
            category {
              ... on ProductCategory {
                id
                title(format: RENDERED)
                slug
              }
            }
            thumbnail {
              sourceUrl(size: LARGE)
              altText
              title
            }
            subcategory {
              ... on ProdSubCategory {
                id
                title(format: RENDERED)
                slug
              }
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
  return query;
}
