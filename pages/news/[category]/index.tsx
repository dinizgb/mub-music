/* eslint-disable react/prop-types */
import React from "react";
import LayoutListWithAside from "layouts/LayoutListWithAside";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import getAllNewsCategories from "services/graphql/queries/getAllNewsCategories";
import { fetchPaths } from "services/core/fetchPaths";

import { QueryParameters } from "types/queryParams";

/**
 * News Index Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the News Index Page.
 */
export default function NewsCategoryPage(props: any) {
  return (
    <LayoutListWithAside
      postData={props.newsData}
      TopFiveWidgetData={props.lastFiveNews}
      TopFiveWidgetTitle={`Last news`}
      layoutSection={`news`}
      layoutTitle={props.newsData[0].categories.nodes[0].name}
      layoutSlug={``}
      layoutDescription={props.newsData[0].categories.nodes[0].description}
    />
  );
}

// eslint-disable-next-line require-jsdoc
export async function getStaticProps(context) {
  const lastNewsParams: QueryParameters = {
    first: 5,
    where: { categoryName: context.params.category },
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

// eslint-disable-next-line require-jsdoc
export async function getStaticPaths() {
  const getAllNewsCategoriesReq = await fetchQuery(getAllNewsCategories());
  const getAllNewsCategoriesResponse =
    getAllNewsCategoriesReq.props.data.categories.nodes;

  const paths = getAllNewsCategoriesResponse.map((item) => ({
    params: { category: item.slug },
  }));

  return fetchPaths(paths);
}
