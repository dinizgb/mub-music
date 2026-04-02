/* eslint-disable react/prop-types */
import React from "react";
// COMPONENTS
import LayoutListWithAside from "layouts/LayoutListWithAside";
// SERVICES
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
// TYPES
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { QueryParameters } from "types/queryParams";

type NewsHomeProps = {
  newsData: any;
  lastFiveNews: any;
  productsCategories: ProductsCategoriesType[];
};

/**
 * News Index Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the News Index Page.
 */
export default function NewsHome(props: NewsHomeProps) {
  return (
    <LayoutListWithAside
      postData={props.newsData}
      TopFiveWidgetData={props.lastFiveNews}
      TopFiveWidgetTitle={`Last news`}
      layoutSection={`news`}
      layoutTitle={`News`}
      layoutSlug={``}
      layoutDescription={`Daily news articles, stories, reviews and much more.`}
      productsCategories={props.productsCategories}
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

  // PRODUCT CATEGORIES
  const getProductCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };
  const getProductCategories = await fetchQuery(
    getAllProductCategories(getProductCategoriesParams)
  );
  const getProductCategoriesResponse: ProductsCategoriesType[] =
    getProductCategories.props.data.productCategories.nodes;

  return {
    props: {
      newsData: lastNewsResponse,
      lastFiveNews: "",
      productsCategories: getProductCategoriesResponse,
    },
  };
}
