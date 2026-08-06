import LayoutHomePage from "layouts/LayoutHomePage";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import getAllProducts from "services/graphql/queries/getAllProducts";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import { QueryParameters } from "types/queryParams";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { i18n } from "@/i18n";
import { buildPageMetadata } from "lib/seo/buildPageMetadata";
import { absoluteUrl } from "lib/seo/absoluteUrl";
import { notFound } from "next/navigation";

const layoutDescription = i18n.home.metaDescription;

export const metadata = buildPageMetadata({
  title: { absolute: i18n.home.metaTitle },
  description: layoutDescription,
  path: "/",
  image: absoluteUrl("/images/home-art.png"),
});

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
