/* eslint-disable react/prop-types */
import React from "react";
import LayoutListWithAside from "layouts/LayoutListWithAside";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import { QueryParameters } from "types/queryParams";

/**
 * News Index Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the News Index Page.
 */
export default function NewsHome(props: any) {
  return (
    <LayoutListWithAside
      postData={props.newsData}
      TopFiveWidgetData={props.lastFiveNews}
      TopFiveWidgetTitle={`Last news`}
      layoutSection={`news`}
      layoutTitle={`News`}
      layoutSlug={``}
      layoutDescription={`Daily news articles, stories, reviews and much more.`}
    />
  );
}

// eslint-disable-next-line require-jsdoc
export async function getStaticProps() {
  const lastNewsParams: QueryParameters = {
    first: 5,
  };
  const lastNews = await fetchQuery(getAllNews(lastNewsParams));
  const lastNewsResponse = lastNews.props.data.posts.nodes;

  return {
    props: {
      newsData: lastNewsResponse,
      lastFiveNews: "",
    },
  };
}
