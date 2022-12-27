import React from "react";
import LayoutHomePage from "layouts/LayoutHomePage";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import getAllProducts from "services/graphql/queries/getAllProducts";
import { QueryParameters } from "types/queryParams";

/**
 * Website Index Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the Home Page.
 */
export default function HomePage(props: any) {
  return (
    <LayoutHomePage
      postData={props.lastFiveNews}
      productData={props.lastProducts}
      layoutDescription={"Mub Music is on the way..."}
    />
  );
}

// eslint-disable-next-line require-jsdoc
export async function getStaticProps() {
  const lastFiveNewsParams: QueryParameters = {
    first: 5,
  };
  const lastFiveNews = await fetchQuery(getAllNews(lastFiveNewsParams));
  const lastFiveNewsResponse = lastFiveNews.props.data.posts.nodes;

  const lastProductsParams: QueryParameters = {
    first: 11,
  };
  const lastProducts = await fetchQuery(getAllProducts(lastProductsParams));
  const lastProductsResponse = lastProducts.props.data.products.nodes;

  return {
    props: {
      lastFiveNews: lastFiveNewsResponse,
      lastProducts: lastProductsResponse,
    },
  };
}
