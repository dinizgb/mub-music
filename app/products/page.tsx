import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutProductCategoryList from "layouts/LayoutProductCategoryList";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import { QueryParameters } from "types/queryParams";
import { SEOTagsConstructorTypes } from "types/SEOTagsConstructorTypes";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { i18n } from "@/i18n";

export const metadata: Metadata = {
  title: i18n.products.title,
  description: i18n.products.description,
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
    pageTitle: i18n.products.title,
    pageExcerpt: i18n.products.description,
    pageType: "product",
    pagePath: "products",
    breadcrumbItemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: i18n.products.breadcrumbHome,
        item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: i18n.products.breadcrumbProducts,
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
