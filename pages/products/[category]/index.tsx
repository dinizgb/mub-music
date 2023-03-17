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
import { ProductType } from "types/productType";
import {
  ProductFilterType,
  ProductFilterResponseType,
} from "types/productFilterType";

type ProductsCategoryPageProps = {
  lastProducts: Array<ProductType>;
  productCategoryData: string;
  productSubCategories: Array<ProductFilterType>;
  productSubCategoryData: string | null;
  productBrands: Array<ProductFilterType>;
  priceAverage: Array<ProductFilterType>;
  seoData: SEOTagsConstructorTypes;
  totalCount: number;
  currentPage: number;
};

/**
 * Products Category Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the Products Category Page.
 */
export default function ProductsCategoryPage(props: ProductsCategoryPageProps) {
  return (
    <LayoutProductsList
      productData={props.lastProducts}
      productCategoryData={props.productCategoryData}
      productSubCategories={props.productSubCategories}
      productSubCategoryData={null}
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

  // PAGINATION SETTINGS
  const offset = context.query.page
    ? paginationOffsetFormatter(context.query.page)
    : 0;
  const currentPage = context.query.page ? parseInt(context.query.page) : 1;

  // PARAMS OPTIONS
  const lastProductsDefaultParams: QueryParameters = {
    where: {
      catSlug: category,
      offsetPagination: { size: 20, offset: offset },
    },
  };
  const lastProductsByBrandParams: QueryParameters = {
    where: {
      brandSlug: context.query.brand,
      catSlug: category,
      offsetPagination: { size: 20, offset: offset },
    },
  };
  const lastProductsParams: QueryParameters = context.query.brand
    ? lastProductsByBrandParams
    : lastProductsDefaultParams;

  // PRODUCTS
  const lastProducts = await fetchQuery(getAllProducts(lastProductsParams));
  const lastProductsResponse: Array<ProductType> =
    lastProducts.props.data.products.nodes;
  const lastProductsTotalRecords: number =
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
  const productsFiltersResponse: Array<ProductFilterResponseType> =
    productsFilters.props.data.products.nodes;

  // PRODUCTS SUBCATEGORIES
  const productSubCategoryCategories: Array<ProductFilterType> =
    productFilterConstructor(productsFiltersResponse, "subcategory");

  // BRANDS
  const brands: Array<ProductFilterType> = productFilterConstructor(
    productsFiltersResponse,
    "brand"
  );

  // PRICE AVERAGE
  const priceAverage: Array<ProductFilterType> = productFilterConstructor(
    productsFiltersResponse,
    "priceAverage"
  );

  // SEO DATA
  const productsPrefix = lastProductsResponse[0];
  const seoData: SEOTagsConstructorTypes = {
    pageTitle: `${
      productsPrefix
        ? productsPrefix.product_info.category.title
        : category.toUpperCase()
    }`,
    pageExcerpt: `Find the best deals on ${
      productsPrefix
        ? productsPrefix.product_info.category.title
        : category.toUpperCase()
    }.`,
    pageType: "product",
    pagePath: `products/${category}`,
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
    ],
  };

  return {
    props: {
      lastProducts: lastProductsResponse,
      productCategoryData: category,
      productSubCategories: productSubCategoryCategories,
      productBrands: brands,
      priceAverage: priceAverage,
      seoData: seoData,
      totalCount: lastProductsTotalRecords,
      currentPage: currentPage,
    },
  };
}
