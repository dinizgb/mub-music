/* eslint-disable react/prop-types */
import React from "react";
// COMPONENTS
import LayoutArticlePage from "layouts/LayoutArticlePage";
// SERVICES
import { fetchQuery } from "services/graphql/fetchQuery";
import getNewsBy from "services/graphql/queries/getNewsBy";
import getAllNews from "services/graphql/queries/getAllNews";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import { fetchPaths } from "services/core/fetchPaths";
// TYPES
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { QueryParameters } from "types/queryParams";
// UTILS
import htmlTagCleaner from "utils/htmlTagCleaner";

type NewsArticlePageProps = {
  newsData: any;
  productsCategories: ProductsCategoriesType[];
};

/**
 * News Article Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the News Article Page.
 */
export default function NewsArticlePage(props: NewsArticlePageProps) {
  return (
    <>
      <LayoutArticlePage
        articleTitle={props.newsData.title}
        articleExcerpt={htmlTagCleaner(props.newsData.excerpt)}
        articleSectionName={"News"}
        articleSectionSlug={"news"}
        articleCategoryName={props.newsData.categories.nodes[0].name}
        articleCategorySlug={props.newsData.categories.nodes[0].slug}
        articleSlug={props.newsData.slug}
        articleDate={props.newsData.date}
        articleModifiedDate={props.newsData.modified}
        articleAuthor={props.newsData.author.name}
        articleFeaturedImage={props.newsData.featuredImage.node.sourceUrl}
        articleContent={props.newsData.content}
        productsCategories={props.productsCategories}
      />
    </>
  );
}

// eslint-disable-next-line require-jsdoc
export async function getStaticProps(context) {
  const getNewsParam: QueryParameters = {
    slug: context.params.slug,
  };
  const getNewsReq = await fetchQuery(getNewsBy(getNewsParam));
  const getNewsResponse = getNewsReq.props.data.postBy;

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
      newsData: getNewsResponse,
      productsCategories: getProductCategoriesResponse,
    },
  };
}

// eslint-disable-next-line require-jsdoc
export async function getStaticPaths() {
  const getAllNewsParams: QueryParameters = {
    first: 20,
  };
  const getAllNewsReq = await fetchQuery(getAllNews(getAllNewsParams));
  const getAllNewsResponse = getAllNewsReq.props.data.posts.nodes;

  const paths = getAllNewsResponse.map((item) => ({
    params: { category: item.categories.nodes[0].slug, slug: item.slug },
  }));

  return fetchPaths(paths);
}
