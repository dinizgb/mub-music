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
      productCategoriesData={props.productCategoriesData}
      productCategoryData={props.productCategoryData}
      productSubCategories={props.productSubCategories}
      productSubCategoryData={null}
      productBrandsData={props.productBrands}
      productPriceAverageData={props.priceAverage}
      seoData={props.seoData}
    />
  );
}

// eslint-disable-next-line require-jsdoc
export async function getStaticProps(context) {
  const category = context.params.category;

  // PRODUCTS
  const lastProductsParams: QueryParameters = {
    first: 10,
    where: { catSlug: category },
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
      ? productsPrefix.product_info.backgroundImage.sourceUrl
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
      productCategoriesData: productCategoriesResponse,
      productSubCategories: productSubCategoriesResponse,
      productBrands: filteredBrands,
      priceAverage: filteredpriceAverage,
      seoData: seoData,
    },
  };
}

// eslint-disable-next-line require-jsdoc
export async function getStaticPaths() {
  const productCategories = await fetchQuery(getAllProductCategories());
  const productCategoriesResponse =
    productCategories.props.data.productCategories.nodes;

  const paths = productCategoriesResponse.map((item) => ({
    params: { category: item.slug },
  }));

  return fetchPaths(paths);
}
