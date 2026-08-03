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

type PageProps = {
  params: Promise<{ category: string }>;
};

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
  const lastNews = await fetchQuery(
    getAllNews({ first: 5, where: { categoryName: category } })
  );
  if (lastNews.notFound || !lastNews.props.data.posts.nodes[0]) {
    return {
      title: category,
      alternates: {
        canonical: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/news/${category}/`,
      },
    };
  }
  const first = lastNews.props.data.posts.nodes[0].categories.nodes[0];
  return {
    title: first.name,
    description: first.description,
    alternates: {
      canonical: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/news/${category}/`,
    },
  };
}

/**
 * News category page.
 * @param {PageProps} props Route params.
 * @return {Promise<ReactElement>} News category page.
 */
export default async function NewsCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const lastNewsParams: QueryParameters = {
    first: 5,
    where: { categoryName: category },
  };
  const lastNews = await fetchQuery(getAllNews(lastNewsParams));
  if (lastNews.notFound || !lastNews.props.data.posts.nodes[0]) notFound();

  const newsData = lastNews.props.data.posts.nodes;

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
      postData={newsData}
      TopFiveWidgetData={""}
      TopFiveWidgetTitle={i18n.news.lastNews}
      layoutSection={`news`}
      layoutTitle={newsData[0].categories.nodes[0].name}
      layoutSlug={``}
      layoutDescription={newsData[0].categories.nodes[0].description}
      productsCategories={productsCategories}
    />
  );
}
