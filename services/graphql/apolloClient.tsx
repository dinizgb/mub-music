import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

/**
 * Builds the Basic Authorization header for GraphQL API requests.
 * @return {string} Authorization header value.
 */
function getApiAuthorizationHeader(): string {
  const user = process.env.ENV_API_USER ?? "";
  const password = process.env.ENV_API_PASSWORD ?? "";
  const credentials = Buffer.from(`${user}:${password}`).toString("base64");
  return `Basic ${credentials}`;
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://${process.env.ENV_API_ROOT_PATH}/graphql`,
    headers: {
      Authorization: getApiAuthorizationHeader(),
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
