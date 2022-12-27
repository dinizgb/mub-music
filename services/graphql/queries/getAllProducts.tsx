import { QueryParameters } from "types/queryParams";
import formatGraphqlQueryParams from "utils/formatGraphqlQueryParams";

/**
 * Query to get All Products.
 * @param {QueryParameters} props to the component.
 * @return {string}: With the query.
 */
export default function getAllProducts(props: QueryParameters) {
  const query = `
    query getAllProducts {
      products(${formatGraphqlQueryParams(props)}) {
        nodes {
          id
          slug
          title(format: RENDERED)
          product_info {
            rating
            price
            backgroundImage {
              sourceUrl(size: LARGE)
              altText
              title
            }
            brand {
              ... on Brand {
                id
                title(format: RENDERED)
                slug
                brand_info {
                  backgroundColor
                  thumbnail {
                    altText
                    sourceUrl(size: MEDIUM)
                  }
                }
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
