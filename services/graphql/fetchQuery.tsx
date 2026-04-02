import { gql } from "@apollo/client";
import client from "services/graphql/apolloClient";
/**
 * Function that returns data to be use on a single page.
 * @param {string} query to be fetched.
 * @return {object}: returns an object with the data according to the response.
 */
export async function fetchQuery(query: string) {
  const { data } = await client.query({
    query: gql`
      ${query}
    `,
  });

  if (data.length == 0) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        data,
      },
    };
  }
}
