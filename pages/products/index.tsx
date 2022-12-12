import React from "react";
import LayoutProductsList from "layouts/LayoutProductsList";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProducts from "services/graphql/queries/getAllProducts";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import getAllProductSubCategories from "services/graphql/queries/getAllProductSubCategories";
import { QueryParameters } from "types/queryParams";

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
      productSubCategories={props.productSubCategories}
      layoutDescription={
        "Find the best deals on Guitars, Bass, Drums, Amps, DJ, Keyboards, Pro-Audio and much more."
      }
    />
  );
}

// eslint-disable-next-line require-jsdoc
export async function getStaticProps() {
  const lastProductsParams: QueryParameters = {
    first: 11,
  };
  const lastProducts = await fetchQuery(getAllProducts(lastProductsParams));
  const lastProductsResponse = lastProducts.props.data.products.nodes;

  const productCategories = await fetchQuery(getAllProductCategories());
  const productCategoriesResponse =
    productCategories.props.data.productCategories.nodes;

  const productSubCategories = await fetchQuery(getAllProductSubCategories());
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
