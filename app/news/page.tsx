import { notFound } from "next/navigation";
import LayoutListWithAside from "layouts/LayoutListWithAside";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { QueryParameters } from "types/queryParams";
import { i18n } from "@/i18n";
import { buildPageMetadata } from "lib/seo/buildPageMetadata";
import JsonLd from "lib/seo/JsonLd";
import { buildBreadcrumbJsonLd } from "lib/seo/jsonld/breadcrumb";
import { absoluteUrl } from "lib/seo/absoluteUrl";
import {
  NEWS_LIST_PAGE_SIZE,
  paginationFromSearchParam,
} from "utils/listPagination";

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export const revalidate = 3600;

export const metadata = buildPageMetadata({
  title: i18n.news.title,
  description: i18n.news.description,
  path: "/news/",
});

/**
 * News index page.
 * @param {PageProps} props Route search params.
 * @return {Promise<ReactElement>} News home page.
 */
export default async function NewsHome({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const { currentPage, offset } = paginationFromSearchParam(
    page,
    NEWS_LIST_PAGE_SIZE
  );
  const lastNewsParams: QueryParameters = {
    where: {
      offsetPagination: { size: NEWS_LIST_PAGE_SIZE, offset },
    },
  };
  const lastNews = await fetchQuery(getAllNews(lastNewsParams));
  if (lastNews.notFound) notFound();
  const lastNewsTotalRecords: number =
    lastNews.props.data.posts.pageInfo.offsetPagination.total;

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
        ])}
      />
      <LayoutListWithAside
        postData={lastNews.props.data.posts.nodes}
        TopFiveWidgetData={""}
        TopFiveWidgetTitle={i18n.news.lastNews}
        layoutSection={`news`}
        layoutTitle={i18n.news.title}
        layoutSlug={``}
        layoutDescription={i18n.news.description}
        productsCategories={productsCategories}
        totalCount={lastNewsTotalRecords}
        currentPage={currentPage}
      />
    </>
  );
}
