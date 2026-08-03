import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutHomePage from "layouts/LayoutHomePage";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import getAllProducts from "services/graphql/queries/getAllProducts";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import { QueryParameters } from "types/queryParams";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { i18n, t } from "@/i18n";

const layoutDescription = i18n.home.metaDescription;

export const metadata: Metadata = {
  title: {
    absolute: t(i18n.home.metaTitle, { description: layoutDescription }),
  },
  description: layoutDescription,
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/`,
  },
  openGraph: {
    title: t(i18n.home.metaTitle, { description: layoutDescription }),
    description: layoutDescription,
    url: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/`,
    images: [
      `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/images/mub-logo-icon.png`,
    ],
  },
};

/**
 * Home page.
 * @return {Promise<ReactElement>} Home page.
 */
export default async function HomePage() {
  const lastFiveNewsParams: QueryParameters = { first: 5 };
  const lastFiveNews = await fetchQuery(getAllNews(lastFiveNewsParams));
  if (lastFiveNews.notFound) notFound();

  const lastProductsParams: QueryParameters = { first: 11 };
  const lastProducts = await fetchQuery(getAllProducts(lastProductsParams));
  if (lastProducts.notFound) notFound();

  const getProductCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };
  const getProductCategories = await fetchQuery(
    getAllProductCategories(getProductCategoriesParams)
  );
  if (getProductCategories.notFound) notFound();

  const productCategories: ProductsCategoriesType[] =
    getProductCategories.props.data.productCategories.nodes;

  return (
    <LayoutHomePage
      postData={lastFiveNews.props.data.posts.nodes}
      productData={lastProducts.props.data.products.nodes}
      productsCategories={productCategories}
      layoutDescription={layoutDescription}
    />
  );
}
