import { QueryParameters } from "types/queryParams";
import formatGraphqlQueryParams from "utils/formatGraphqlQueryParams";

/**
 * Query to get All News.
 * @param {QueryParameters} props to the component.
 * @return {string}: With the query.
 */
export default function getAllNews(props: QueryParameters) {
  const query = `
    query getAllNews {
      posts(${formatGraphqlQueryParams(props)}) {
        nodes {
          id
          slug
          date
          modified
          title(format: RENDERED)
          excerpt(format: RENDERED)
          author {
            node {
              id
              firstName
              lastName
              slug
            }
          }
          featuredImage {
            node {
              altText
              title(format: RAW)
              sourceUrl(size: MEDIUM_LARGE)
            }
          }
          categories {
            nodes {
              id
              slug
              name
              description
            }
          }
          tags {
            nodes {
              slug
              name
            }
          }
        }
      }
    }`;
  return query;
}
