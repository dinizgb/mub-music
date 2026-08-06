import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutArticlePage from "layouts/LayoutArticlePage";
import { fetchQuery } from "services/graphql/fetchQuery";
import getNewsBy from "services/graphql/queries/getNewsBy";
import getAllNews from "services/graphql/queries/getAllNews";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { QueryParameters } from "types/queryParams";
import htmlTagCleaner from "utils/htmlTagCleaner";
import { i18n } from "@/i18n";
import { buildPageMetadata } from "lib/seo/buildPageMetadata";
import { absoluteUrl } from "lib/seo/absoluteUrl";
import JsonLd from "lib/seo/JsonLd";
import { buildBreadcrumbJsonLd } from "lib/seo/jsonld/breadcrumb";
import { buildNewsArticleJsonLd } from "lib/seo/jsonld/newsArticle";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export const dynamicParams = true;

/**
 * Builds static params for news articles.
 * @return {Promise<Array<{category: string, slug: string}>>} Paths.
 */
export async function generateStaticParams() {
  try {
    const getAllNewsParams: QueryParameters = { first: 20 };
    const getAllNewsReq = await fetchQuery(getAllNews(getAllNewsParams));
    if (getAllNewsReq.notFound) return [];

    return getAllNewsReq.props.data.posts.nodes.map(
      (item: {
        categories: { nodes: Array<{ slug: string }> };
        slug: string;
      }) => ({
        category: item.categories.nodes[0].slug,
        slug: item.slug,
      })
    );
  } catch {
    return [];
  }
}

/**
 * Builds metadata for a news article page.
 * @param {PageProps} props Route params.
 * @return {Promise<Metadata>} Page metadata.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const getNewsReq = await fetchQuery(getNewsBy({ slug }));
  if (getNewsReq.notFound || !getNewsReq.props.data.postBy) {
    return { title: slug };
  }
  const newsData = getNewsReq.props.data.postBy;
  const description = htmlTagCleaner(newsData.excerpt);
  return buildPageMetadata({
    title: newsData.title,
    description,
    path: `/news/${category}/${slug}/`,
    type: "article",
    image: newsData.featuredImage?.node?.sourceUrl,
    publishedTime: newsData.date,
    modifiedTime: newsData.modified,
  });
}

/**
 * News article page.
 * @param {PageProps} props Route params.
 * @return {Promise<ReactElement>} Article page.
 */
export default async function NewsArticlePage({ params }: PageProps) {
  const { category, slug } = await params;
  const getNewsReq = await fetchQuery(getNewsBy({ slug }));
  if (getNewsReq.notFound || !getNewsReq.props.data.postBy) notFound();

  const newsData = getNewsReq.props.data.postBy;
  const articleUrl = absoluteUrl(`/news/${category}/${slug}/`);
  const articleExcerpt = htmlTagCleaner(newsData.excerpt);
  const categoryName = newsData.categories.nodes[0].name;
  const categorySlug = newsData.categories.nodes[0].slug;

  const getProductCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };
  const getProductCategories = await fetchQuery(
    getAllProductCategories(getProductCategoriesParams)
  );
  if (getProductCategories.notFound) notFound();

  const productsCategories: ProductsCategoriesType[] =
    getProductCategories.props.data.productCategories.nodes;

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: i18n.article.breadcrumbHome, item: absoluteUrl("/") },
          { name: i18n.article.breadcrumbNews, item: absoluteUrl("/news/") },
          {
            name: categoryName,
            item: absoluteUrl(`/news/${categorySlug}/`),
          },
          { name: newsData.title, item: articleUrl },
        ])}
      />
      <JsonLd
        data={buildNewsArticleJsonLd({
          title: newsData.title,
          description: articleExcerpt,
          image: newsData.featuredImage?.node?.sourceUrl,
          datePublished: newsData.date,
          dateModified: newsData.modified,
          authorName: newsData.author.name,
          sectionName: i18n.article.sectionNews,
          url: articleUrl,
        })}
      />
      <LayoutArticlePage
        articleTitle={newsData.title}
        articleExcerpt={articleExcerpt}
        articleSectionName={i18n.article.sectionNews}
        articleSectionSlug={"news"}
        articleCategoryName={categoryName}
        articleCategorySlug={categorySlug}
        articleSlug={newsData.slug}
        articleDate={newsData.date}
        articleModifiedDate={newsData.modified}
        articleAuthor={newsData.author.name}
        articleFeaturedImage={newsData.featuredImage.node.sourceUrl}
        articleContent={newsData.content}
        productsCategories={productsCategories}
      />
    </>
  );
}
