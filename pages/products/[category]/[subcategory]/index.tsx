import React from "react";
import LayoutProductsList from "layouts/LayoutProductsList";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProducts from "services/graphql/queries/getAllProducts";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import getAllProductSubCategories from "services/graphql/queries/getAllProductSubCategories";
import { fetchPaths } from "services/core/fetchPaths";
import removeDuplicatesObjectsFromArray from "utils/removeDuplicatesObjectsFromArray";
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
    />
  );
}

// eslint-disable-next-line require-jsdoc
export async function getStaticProps(context) {
  const category = context.params.category;
  const subCategory = context.params.subcategory;

  // PRODUCTS
  const lastProductsParams: QueryParameters = {
    first: 10,
    where: { subCatSlug: subCategory },
  };
  const lastProducts = await fetchQuery(getAllProducts(lastProductsParams));
  const lastProductsResponse = lastProducts.props.data.products.nodes;

  // PRODUCTS CATEGORIES
  const productCategories = await fetchQuery(getAllProductCategories());
  const productCategoriesResponse =
    productCategories.props.data.productCategories.nodes;

  // PRODUCTS SUBCATEGORIES
  const productSubCategoriesParams: QueryParameters = {
    where: { parentCategory: category },
  };
  const productSubCategories = await fetchQuery(
    getAllProductSubCategories(productSubCategoriesParams)
  );
  const productSubCategoriesResponse =
    productSubCategories.props.data.prodSubCategories.nodes;

  // BRANDS
  const brands = lastProductsResponse.map((obj) => obj.product_info.brand);
  const filteredBrands = removeDuplicatesObjectsFromArray(brands);

  // PRICE AVERAGE
  const priceAverage = lastProductsResponse.map(
    (obj) => obj.product_info.priceAverage
  );
  const filteredpriceAverage = removeDuplicatesObjectsFromArray(priceAverage);

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
      productCategories: productCategoriesResponse,
      productCategoryData: category,
      productSubCategories: productSubCategoriesResponse,
      productSubCategoryData: subCategory,
      productBrands: filteredBrands,
      priceAverage: filteredpriceAverage,
      seoData: seoData,
      totalCount:
        lastProducts.props.data.products.pageInfo.offsetPagination.total,
    },
  };
}

// eslint-disable-next-line require-jsdoc
export async function getStaticPaths() {
  const pathsParams: QueryParameters = {
    first: 20,
  };

  const getProducts = await fetchQuery(getAllProducts(pathsParams));
  const getProductsResponse = getProducts.props.data.products.nodes;

  const paths = getProductsResponse.map((item) => ({
    params: {
      category: item.product_info.category.slug,
      subcategory: item.product_info.subcategory.slug,
    },
  }));

  return fetchPaths(paths);
}
