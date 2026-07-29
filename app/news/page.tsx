import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutListWithAside from "layouts/LayoutListWithAside";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { QueryParameters } from "types/queryParams";

export const metadata: Metadata = {
  title: "News",
  description: "Daily news articles, stories, reviews and much more.",
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/news/`,
  },
};

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
    <LayoutListWithAside
      postData={lastNews.props.data.posts.nodes}
      TopFiveWidgetData={""}
      TopFiveWidgetTitle={`Last news`}
      layoutSection={`news`}
      layoutTitle={`News`}
      layoutSlug={``}
      layoutDescription={`Daily news articles, stories, reviews and much more.`}
      productsCategories={productsCategories}
    />
  );
}
