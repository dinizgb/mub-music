"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import GlobalStyle from "styles/global-style";
import { theme } from "styles/theme";
import { store } from "redux/store";
import client from "services/graphql/apolloClient";
import StyledComponentsRegistry from "./lib/registry";

/**
 * Client providers for Apollo, Redux, and styled-components.
 * @param {{ children: ReactNode }} props Provider children.
 * @return {ReactElement} App providers tree.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
          </ThemeProvider>
        </Provider>
      </ApolloProvider>
    </StyledComponentsRegistry>
  );
}
