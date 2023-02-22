import { QueryParameters } from "types/queryParams";
import formatGraphqlQueryParams from "utils/formatGraphqlQueryParams";

/**
 * Query to get All Products.
 * @param {QueryParameters} props to the component.
 * @return {string}: With the query.
 */
export default function getAllProductFiltersInfos(props: QueryParameters) {
  const query = `
    query getAllProductFiltersInfos {
      products(${formatGraphqlQueryParams(props)}) {
        nodes {
          product_info {
            brand {
              ... on Brand {
                id
                title(format: RENDERED)
                slug
              }
            }
            category {
              ... on ProductCategory {
                id
                title(format: RENDERED)
                slug
              }
            }
            subcategory {
              ... on ProdSubCategory {
                id
                title(format: RENDERED)
                slug
              }
            }
            rating
            priceAverage {
              ... on PriceAverage {
                id
                title(format: RENDERED)
                slug
              }
            }
          }
        }
      }
    }`;
  return query;
}
