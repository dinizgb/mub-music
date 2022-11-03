import React from "react";
import LayoutHomePage from "layouts/LayoutHomePage";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import { QueryParameters } from "types/queryParams";

/**
 * Website Index Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the Home Page.
 */
export default function Home(props: any) {
  return (
    <LayoutHomePage
      postData={props.lastFiveNews}
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

  return {
    props: {
      lastFiveNews: lastFiveNewsResponse,
    },
  };
}
