import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutListWithAside from "layouts/LayoutListWithAside";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import getAllNewsCategories from "services/graphql/queries/getAllNewsCategories";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { QueryParameters } from "types/queryParams";
import { i18n } from "@/i18n";
import { buildPageMetadata } from "lib/seo/buildPageMetadata";
import { absoluteUrl } from "lib/seo/absoluteUrl";
import JsonLd from "lib/seo/JsonLd";
import { buildBreadcrumbJsonLd } from "lib/seo/jsonld/breadcrumb";
import {
  NEWS_LIST_PAGE_SIZE,
  paginationFromSearchParam,
} from "utils/listPagination";

type PageProps = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export const revalidate = 3600;
export const dynamicParams = true;

/**
 * Builds static params for news categories.
 * @return {Promise<Array<{category: string}>>} Paths.
 */
export async function generateStaticParams() {
  try {
    const getAllNewsCategoriesReq = await fetchQuery(getAllNewsCategories());
    if (getAllNewsCategoriesReq.notFound) return [];

    return getAllNewsCategoriesReq.props.data.categories.nodes.map(
      (item: { slug: string }) => ({
        category: item.slug,
      })
    );
  } catch {
    return [];
  }
}

/**
 * Builds metadata for a news category page.
 * @param {PageProps} props Route params.
 * @return {Promise<Metadata>} Page metadata.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const path = `/news/${category}/`;
  const lastNews = await fetchQuery(
    getAllNews({ first: 5, where: { categoryName: category } })
  );
  if (lastNews.notFound || !lastNews.props.data.posts.nodes[0]) {
    return buildPageMetadata({
      title: category,
      description: i18n.news.description,
      path,
    });
  }
  const first = lastNews.props.data.posts.nodes[0].categories.nodes[0];
  return buildPageMetadata({
    title: first.name,
    description: first.description || i18n.news.description,
    path,
  });
}

/**
 * News category page.
 * @param {PageProps} props Route params.
 * @return {Promise<ReactElement>} News category page.
 */
export default async function NewsCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params;
  const { page } = await searchParams;
  const { currentPage, offset } = paginationFromSearchParam(
    page,
    NEWS_LIST_PAGE_SIZE
  );
  const lastNewsParams: QueryParameters = {
    where: {
      categoryName: category,
      offsetPagination: { size: NEWS_LIST_PAGE_SIZE, offset },
    },
  };
  const lastNews = await fetchQuery(getAllNews(lastNewsParams));
  if (lastNews.notFound || !lastNews.props.data.posts.nodes[0]) notFound();

  const newsData = lastNews.props.data.posts.nodes;
  const lastNewsTotalRecords: number =
    lastNews.props.data.posts.pageInfo.offsetPagination.total;
  const categoryName = newsData[0].categories.nodes[0].name;
  const categoryDescription = newsData[0].categories.nodes[0].description;

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
          { name: i18n.news.title, item: absoluteUrl("/news/") },
          {
            name: categoryName,
            item: absoluteUrl(`/news/${category}/`),
          },
        ])}
      />
      <LayoutListWithAside
        postData={newsData}
        TopFiveWidgetData={""}
        TopFiveWidgetTitle={i18n.news.lastNews}
        layoutSection={`news`}
        layoutTitle={categoryName}
        layoutSlug={``}
        layoutDescription={categoryDescription}
        productsCategories={productsCategories}
        totalCount={lastNewsTotalRecords}
        currentPage={currentPage}
      />
    </>
  );
}
