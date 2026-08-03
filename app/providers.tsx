"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { store } from "redux/store";
import client from "services/graphql/apolloClient";

/**
 * Client providers for Apollo and Redux.
 * @param {{ children: ReactNode }} props Provider children.
 * @return {ReactElement} App providers tree.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>{children}</Provider>
    </ApolloProvider>
  );
}
