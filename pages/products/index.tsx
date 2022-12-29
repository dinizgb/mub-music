import React from "react";
import LayoutProductsList from "layouts/LayoutProductsList";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProducts from "services/graphql/queries/getAllProducts";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import removeDuplicatesObjectsFromArray from "utils/removeDuplicatesObjectsFromArray";
import paginationOffsetFormatter from "utils/paginationOffsetFormatter";
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
      productSubCategories={props.productSubCategories}
      productSubCategoryData={null}
      productBrandsData={props.productBrands}
      productPriceAverageData={props.priceAverage}
      seoData={props.seoData}
      totalCount={props.totalCount}
    />
  );
}

// eslint-disable-next-line require-jsdoc
export async function getServerSideProps(context) {
  // PAGINATION SETTINGS
  const offset = context.query.page
    ? paginationOffsetFormatter(context.query.page)
    : 0;

  // PRODUCTS
  const lastProductsParams: QueryParameters = {
    where: { offsetPagination: { size: 20, offset: offset } },
  };
  const lastProducts = await fetchQuery(getAllProducts(lastProductsParams));
  const lastProductsResponse = lastProducts.props.data.products.nodes;

  // PRODUCTS CATEGORIES
  const productCategories = await fetchQuery(getAllProductCategories());
  const productCategoriesResponse =
    productCategories.props.data.productCategories.nodes;

  // PRODUCTS SUBCATEGORIES
  const productSubCategories = lastProductsResponse.map(
    (obj) => obj.product_info.subcategory
  );
  const filteredProductSubCategories =
    removeDuplicatesObjectsFromArray(productSubCategories);

  // BRANDS
  const brands = lastProductsResponse.map((obj) => obj.product_info.brand);
  const filteredBrands = removeDuplicatesObjectsFromArray(brands);

  // PRICE AVERAGE
  const priceAverage = lastProductsResponse.map(
    (obj) => obj.product_info.priceAverage
  );
  const filteredpriceAverage = removeDuplicatesObjectsFromArray(priceAverage);

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
      productCategories: productCategoriesResponse,
      productSubCategories: filteredProductSubCategories,
      productBrands: filteredBrands,
      priceAverage: filteredpriceAverage,
      seoData: seoData,
      totalCount:
        lastProducts.props.data.products.pageInfo.offsetPagination.total,
    },
  };
}
