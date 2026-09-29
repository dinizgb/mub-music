import LayoutHomePage from "layouts/LayoutHomePage";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import getAllProducts from "services/graphql/queries/getAllProducts";
import getFeaturedOffers from "services/graphql/queries/getFeaturedOffers";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import getProductsCount from "services/graphql/queries/getProductsCount";
import { QueryParameters } from "types/queryParams";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { ProductType } from "types/productType";
import parseProductIds, { orderItemsByIds } from "utils/parseProductIds";
import { buildHomeStats } from "utils/homeStats";
import { i18n } from "@/i18n";
import { buildPageMetadata } from "lib/seo/buildPageMetadata";
import { absoluteUrl } from "lib/seo/absoluteUrl";
import { notFound } from "next/navigation";

export const revalidate = 3600;

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

  const featuredOffers = await fetchQuery(getFeaturedOffers({ first: 1 }));
  const productIds = parseProductIds(
    featuredOffers.props?.data?.featuredOffers?.nodes?.[0]?.content
  );

  let productData: ProductType[] = [];
  if (productIds.length > 0) {
    const featuredProducts = await fetchQuery(
      getAllProducts({
        first: productIds.length,
        where: { in: productIds },
      })
    );
    if (!featuredProducts.notFound) {
      productData = orderItemsByIds(
        featuredProducts.props.data.products.nodes,
        productIds,
        (product) => product.databaseId ?? 0
      );
    }
  }

  const getProductCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };
  const getProductCategories = await fetchQuery(
    getAllProductCategories(getProductCategoriesParams)
  );
  if (getProductCategories.notFound) notFound();

  const productCategories: ProductsCategoriesType[] =
    getProductCategories.props.data.productCategories.nodes;

  const productsCount = await fetchQuery(getProductsCount({ first: 1 }));
  const productCount = productsCount.notFound
    ? 0
    : (productsCount.props.data.products.pageInfo.offsetPagination.total ?? 0);

  return (
    <LayoutHomePage
      postData={lastFiveNews.props.data.posts.nodes}
      productData={productData}
      productsCategories={productCategories}
      layoutDescription={layoutDescription}
      homeStats={buildHomeStats(productCount)}
    />
  );
}
