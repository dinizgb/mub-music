import React from "react";
import LayoutProductsList from "layouts/LayoutProductsList";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProducts from "services/graphql/queries/getAllProducts";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import getAllProductSubCategories from "services/graphql/queries/getAllProductSubCategories";
import { fetchPaths } from "services/core/fetchPaths";
import { QueryParameters } from "types/queryParams";

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
      layoutDescription={
        "Find the best deals on Guitars, Bass, Drums, Amps, DJ, Keyboards, Pro-Audio and much more."
      }
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

  return {
    props: {
      lastProducts: lastProductsResponse,
      productCategoryData: category,
      productCategoriesData: productCategoriesResponse,
      productSubCategories: productSubCategoriesResponse,
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
