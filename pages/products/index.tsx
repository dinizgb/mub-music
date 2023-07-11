import React from "react";
import LayoutProductCategoryList from "layouts/LayoutProductCategoryList";
// SERVICES
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
// TYPES
import { QueryParameters } from "types/queryParams";
import { SEOTagsConstructorTypes } from "types/SEOTagsConstructorTypes";
import { ProductsCategoriesType } from "types/productsCategoriesType";

type ProductsHomePageProps = {
  lastProductsCategories: ProductsCategoriesType[];
  seoData: SEOTagsConstructorTypes;
  totalCount: number;
};

/**
 * Products Home Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the Products Home Page.
 */
export default function ProductsHomePage(props: ProductsHomePageProps) {
  return (
    <LayoutProductCategoryList
      lastProductsCategories={props.lastProductsCategories}
      seoData={props.seoData}
      totalCount={props.totalCount}
    />
  );
}

// eslint-disable-next-line require-jsdoc
export async function getStaticProps() {
  // PARAMS OPTIONS
  const lastProductsCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };

  // PRODUCTS
  const lastProducts = await fetchQuery(
    getAllProductCategories(lastProductsCategoriesParams)
  );
  const lastProductsCategoriesResponse: ProductsCategoriesType[] =
    lastProducts.props.data.productCategories.nodes;
  const lastProductsCategoriesTotalRecords: number =
    lastProducts.props.data.productCategories.pageInfo.offsetPagination.total;

  // SEO DATA
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

  return {
    props: {
      lastProductsCategories: lastProductsCategoriesResponse,
      seoData: seoData,
      totalCount: lastProductsCategoriesTotalRecords,
    },
  };
}
