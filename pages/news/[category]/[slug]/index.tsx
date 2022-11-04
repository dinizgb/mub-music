/* eslint-disable react/prop-types */
import React from "react";
import ArticleFormat from "layouts/ArticleFormat";
import { fetchQuery } from "services/graphql/fetchQuery";
import getNewsBySlug from "services/graphql/queries/getNewsBySlug";
import getAllNews from "services/graphql/queries/getAllNews";
import { fetchPaths } from "services/core/fetchPaths";
import htmlTagCleaner from "utils/htmlTagCleaner";
import { QueryParameters } from "types/queryParams";

/**
 * News Article Page.
 * @return {TSX.Element}: The TSX code for the News Article Page.
 */
export default function NewsArticlePage({ response }) {
  return (
    <>
      <ArticleFormat
        articleTitle={response.title}
        articleExcerpt={htmlTagCleaner(response.excerpt)}
        articleSectionName={"News"}
        articleSectionSlug={"news"}
        articleCategoryName={response.categories.nodes[0].name}
        articleCategorySlug={response.categories.nodes[0].slug}
        articleSlug={response.slug}
        articleDate={response.date}
        articleModifiedDate={response.modified}
        articleAuthor={response.author.name}
        articleFeaturedImage={response.featuredImage.node.sourceUrl}
        articleContent={response.content}
      />
    </>
  );
}

// eslint-disable-next-line require-jsdoc
export async function getStaticProps(context) {
  const getNewsParam: QueryParameters = {
    slug: context.params.slug,
  };
  const getNewsReq = await fetchQuery(getNewsBySlug(getNewsParam));
  const getNewsResponse = getNewsReq.props.data.postBy;

  return {
    props: {
      response: getNewsResponse,
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
  return fetchPaths(getAllNewsResponse, 2);
}
