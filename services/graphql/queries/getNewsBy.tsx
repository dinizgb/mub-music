import { QueryParameters } from "types/queryParams";
import formatGraphqlQueryParams from "utils/formatGraphqlQueryParams";

/**
 * Query to get news by Slug.
 * @param {QueryParameters} props to the component.
 * @return {string}: With the query.
 */
export default function getNewsBy(props: QueryParameters) {
  const query = `
    query getNewsBy {
      postBy(${formatGraphqlQueryParams(props)}) {
        id
        slug
        date
        modified
        title(format: RENDERED)
        excerpt(format: RENDERED)
        content(format: RENDERED)
        featuredImage {
          node {
            altText
            id
            sourceUrl(size: LARGE)
          }
        }
        author {
          node {
            id
            name
            slug
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
      }
    }`;
  return query;
}
