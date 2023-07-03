/* eslint-disable react/prop-types */
import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/global-style";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { ApolloProvider } from "@apollo/client";
import client from "services/graphql/apolloClient";

export const theme = {
  colors: {
    background: "#080B14",
    line_bottom: "#444",
    light_line_bottom: "#eee",
    oddSection: "#2b2946",
    primary_hover: "#FFBE19",
    primary: "#F5B100",
    secondary_hover: "#252936",
    secondary: "#20232E",
    subtitle: "#999",
    text_1: "#333",
    text_2: "#aaa",
    text_3: "#ccc",
    text_4: "#fff",
  },
  gradients: {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
  },
  breakpoints: {
    md: 1200,
    sm: 900,
    xs: 600,
  },
};

// eslint-disable-next-line require-jsdoc
export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}
