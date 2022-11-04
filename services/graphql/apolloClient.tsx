import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `https://${process.env.NEXT_PUBLIC_ENV_API_ROOT_PATH}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
