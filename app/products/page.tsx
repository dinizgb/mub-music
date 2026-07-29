import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutProductCategoryList from "layouts/LayoutProductCategoryList";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import { QueryParameters } from "types/queryParams";
import { SEOTagsConstructorTypes } from "types/SEOTagsConstructorTypes";
import { ProductsCategoriesType } from "types/productsCategoriesType";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Find the best deals on Guitars, Bass, Drums, Amps, DJ, Keyboards, Pro-Audio and much more.",
  alternates: {
    canonical: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/`,
  },
};

/**
 * Products index page.
 * @return {Promise<ReactElement>} Products home page.
 */
export default async function ProductsHomePage() {
  const lastProductsCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };
  const lastProducts = await fetchQuery(
    getAllProductCategories(lastProductsCategoriesParams)
  );
  if (lastProducts.notFound) notFound();

  const lastProductsCategoriesResponse: ProductsCategoriesType[] =
    lastProducts.props.data.productCategories.nodes;
  const lastProductsCategoriesTotalRecords: number =
    lastProducts.props.data.productCategories.pageInfo.offsetPagination.total;

  const seoData: SEOTagsConstructorTypes = {
    pageTitle: "Products",
    pageExcerpt:
      "Find the best deals on Guitars, Bass, Drums, Amps, DJ, Keyboards, Pro-Audio and much more.",
    pageType: "product",
    pagePath: "products",
    breadcrumbItemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/`,
      },
    ],
  };

  return (
    <LayoutProductCategoryList
      lastProductsCategories={lastProductsCategoriesResponse}
      seoData={seoData}
      totalCount={lastProductsCategoriesTotalRecords}
    />
  );
}
