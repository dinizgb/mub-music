import React from "react";
import LayoutProductsList from "layouts/LayoutProductsList";
// SERVICES
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProducts from "services/graphql/queries/getAllProducts";
import getAllProductFiltersInfos from "services/graphql/queries/getAllProductFiltersInfos";
import productFilterConstructor from "services/filters/productFilterConstructor";
// UTILS
import paginationOffsetFormatter from "utils/paginationOffsetFormatter";
// TYPES
import { QueryParameters } from "types/queryParams";
import { SEOTagsConstructorTypes } from "types/SEOTagsConstructorTypes";

/**
 * Products Home Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the Products Home Page.
 */
export default function ProductsHomePage(props: any) {
  return (
    <LayoutProductsList
      productData={props.lastProducts}
      productCategoriesData={props.productCategories}
      productCategoryData={null}
      productSubCategories={null}
      productSubCategoryData={null}
      productBrandsData={props.productBrands}
      productPriceAverageData={null}
      seoData={props.seoData}
      totalCount={props.totalCount}
      currentPage={props.currentPage}
    />
  );
}

// eslint-disable-next-line require-jsdoc
export async function getServerSideProps(context) {
  // PAGINATION SETTINGS
  const offset = context.query.page
    ? paginationOffsetFormatter(context.query.page)
    : 0;
  const currentPage = context.query.page ? parseInt(context.query.page) : 1;

  // PARAMS OPTIONS
  const lastProductsDefaultParams: QueryParameters = {
    where: { offsetPagination: { size: 20, offset: offset } },
  };
  const lastProductsParamsOnlyByBrand: QueryParameters = {
    where: {
      offsetPagination: { size: 20, offset: offset },
      brandSlug: context.query.brand,
    },
  };
  const lastProductsParams: QueryParameters = context.query.brand
    ? lastProductsParamsOnlyByBrand
    : lastProductsDefaultParams;

  // PRODUCTS
  const lastProducts = await fetchQuery(getAllProducts(lastProductsParams));
  const lastProductsResponse = lastProducts.props.data.products.nodes;
  const lastProductsTotalRecords =
    lastProducts.props.data.products.pageInfo.offsetPagination.total;

  // PRODUCT FILTERS
  const productsFiltersParams: QueryParameters = {
    where: {
      offsetPagination: {
        size: lastProductsTotalRecords,
        offset: 1,
      },
    },
  };
  const productsFilters = await fetchQuery(
    getAllProductFiltersInfos(productsFiltersParams)
  );
  const productsFiltersResponse = productsFilters.props.data.products.nodes;

  // PRODUCTS CATEGORIES
  const productCategories = productFilterConstructor(
    productsFiltersResponse,
    "category"
  );

  // BRANDS
  const brands = productFilterConstructor(productsFiltersResponse, "brand");

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
      lastProducts: lastProductsResponse,
      productCategories: productCategories,
      productBrands: brands,
      seoData: seoData,
      totalCount: lastProductsTotalRecords,
      currentPage: currentPage,
    },
  };
}
