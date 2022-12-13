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
      productCategoriesData={props.productCategories}
      productCategoryData={null}
      productSubCategories={props.productSubCategories}
      layoutDescription={
        "Find the best deals on Guitars, Bass, Drums, Amps, DJ, Keyboards, Pro-Audio and much more."
      }
    />
  );
}

// eslint-disable-next-line require-jsdoc
export async function getStaticProps(context) {
  // PRODUCTS
  const lastProductsParams: QueryParameters = {
    first: 10,
    where: { subCatSlug: context.params.subcategory },
  };
  const lastProducts = await fetchQuery(getAllProducts(lastProductsParams));
  const lastProductsResponse = lastProducts.props.data.products.nodes;

  // PRODUCTS CATEGORIES
  const productCategories = await fetchQuery(getAllProductCategories());
  const productCategoriesResponse =
    productCategories.props.data.productCategories.nodes;

  // PRODUCTS SUBCATEGORIES
  const productSubCategoriesParams: QueryParameters = {
    first: 50,
  };
  const productSubCategories = await fetchQuery(
    getAllProductSubCategories(productSubCategoriesParams)
  );
  const productSubCategoriesResponse =
    productSubCategories.props.data.prodSubCategories.nodes;

  return {
    props: {
      lastProducts: lastProductsResponse,
      productCategories: productCategoriesResponse,
      productSubCategories: productSubCategoriesResponse,
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
