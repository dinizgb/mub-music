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
 * Products Category Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the Products Category Page.
 */
export default function ProductsCategoryPage(props: any) {
  return (
    <LayoutProductsList
      productData={props.lastProducts}
      productCategoriesData={props.productCategories}
      productCategoryData={props.productCategoryData}
      productSubCategories={props.productSubCategories}
      productSubCategoryData={props.productSubCategoryData}
      productBrandsData={props.productBrands}
      productPriceAverageData={props.priceAverage}
      seoData={props.seoData}
      totalCount={props.totalCount}
      currentPage={props.currentPage}
    />
  );
}

// eslint-disable-next-line require-jsdoc
export async function getServerSideProps(context) {
  const category = context.params.category;
  const subCategory = context.params.subcategory;

  // PAGINATION SETTINGS
  const offset = context.query.page
    ? paginationOffsetFormatter(context.query.page)
    : 0;
  const currentPage = context.query.page ? parseInt(context.query.page) : 1;

  // PARAMS OPTIONS
  const lastProductsDefaultParams: QueryParameters = {
    where: {
      subCatSlug: subCategory,
      offsetPagination: { size: 20, offset: offset },
    },
  };
  const lastProductsByBrandParams: QueryParameters = {
    where: {
      brandSlug: context.query.brand,
      subCatSlug: subCategory,
      offsetPagination: { size: 20, offset: offset },
    },
  };
  const lastProductsParams: QueryParameters = context.query.brand
    ? lastProductsByBrandParams
    : lastProductsDefaultParams;

  // PRODUCTS
  const lastProducts = await fetchQuery(getAllProducts(lastProductsParams));
  const lastProductsResponse = lastProducts.props.data.products.nodes;
  const lastProductsTotalRecords =
    lastProducts.props.data.products.pageInfo.offsetPagination.total;

  // PRODUCT FILTERS
  const productsFiltersParams: QueryParameters = {
    where: {
      catSlug: category,
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

  // PRODUCTS SUBCATEGORIES
  const productSubCategoryCategories = productFilterConstructor(
    productsFiltersResponse,
    "subcategory"
  );

  // BRANDS
  const brands = productFilterConstructor(productsFiltersResponse, "brand");

  // PRICE AVERAGE
  const priceAverage = productFilterConstructor(
    productsFiltersResponse,
    "priceAverage"
  );

  // SEO DATA
  const productsPrefix = lastProductsResponse[0];
  const seoData: SEOTagsConstructorTypes = {
    pageTitle: `${
      productsPrefix
        ? productsPrefix.product_info.subcategory.title
        : subCategory.toUpperCase()
    }`,
    pageExcerpt: `Find the best deals on ${
      productsPrefix
        ? productsPrefix.product_info.subcategory.title
        : subCategory.toUpperCase()
    }.`,
    pageType: "product",
    pagePath: `products/${category}/${subCategory}`,
    pageThumb: productsPrefix
      ? productsPrefix.product_info.thumbnail.sourceUrl
      : "",
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
      {
        "@type": "ListItem",
        position: 3,
        name: `${
          productsPrefix
            ? productsPrefix.product_info.category.title
            : category.toUpperCase()
        }`,
        item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/${category}/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${
          productsPrefix
            ? productsPrefix.product_info.subcategory.title
            : subCategory.toUpperCase()
        }`,
        item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/${category}/${subCategory}/`,
      },
    ],
  };

  return {
    props: {
      lastProducts: lastProductsResponse,
      productCategories: productCategories,
      productCategoryData: category,
      productSubCategories: productSubCategoryCategories,
      productSubCategoryData: subCategory,
      productBrands: brands,
      priceAverage: priceAverage,
      seoData: seoData,
      totalCount:
        lastProducts.props.data.products.pageInfo.offsetPagination.total,
      currentPage: currentPage,
    },
  };
}
