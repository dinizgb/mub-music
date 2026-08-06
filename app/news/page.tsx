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

export const metadata = buildPageMetadata({
  title: i18n.news.title,
  description: i18n.news.description,
  path: "/news/",
});

/**
 * News index page.
 * @return {Promise<ReactElement>} News home page.
 */
export default async function NewsHome() {
  const lastNewsParams: QueryParameters = { first: 5 };
  const lastNews = await fetchQuery(getAllNews(lastNewsParams));
  if (lastNews.notFound) notFound();

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
      />
    </>
  );
}
