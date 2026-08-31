import { gql } from "@apollo/client";
import client from "services/graphql/apolloClient";

export type FetchQueryResult<TData = any> =
  | { props: { data: TData }; notFound?: never }
  | { notFound: true; props?: never };

/**
 * Function that returns data to be use on a single page.
 * @param {string} query to be fetched.
 * @return {Promise<FetchQueryResult>} GraphQL result or notFound marker.
 */
export async function fetchQuery<TData = any>(
  query: string
): Promise<FetchQueryResult<TData>> {
  const { data } = await client.query<TData>({
    query: gql`
      ${query}
    `,
  });

  if (
    data == null ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === "object" && Object.keys(data as object).length === 0)
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}
