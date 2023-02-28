import { QueryParameters } from "types/queryParams";
import formatGraphqlQueryParams from "utils/formatGraphqlQueryParams";

/**
 * Query to get All Products.
 * @param {QueryParameters} props to the component.
 * @return {string}: With the query.
 */
export default function getProductBy(props: QueryParameters) {
  const query = `
    query getProductBy {
      productBy(${formatGraphqlQueryParams(props)}) {
        id
        slug
        title(format: RENDERED)
        product_info {
          colors
          description
          featureVideo
          specifications
          rating
          price
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
          priceAverage {
            ... on PriceAverage {
              id
              title(format: RENDERED)
              slug
            }
          }
        }
      }
    }`;
  return query;
}
