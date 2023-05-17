/* eslint-disable react/prop-types */
import React from "react";
// SERVICES
import { fetchQuery } from "services/graphql/fetchQuery";
import getProductBy from "services/graphql/queries/getProductBy";
import getAllProducts from "services/graphql/queries/getAllProducts";
import { fetchPaths } from "services/core/fetchPaths";
// COMPONENTS
import LayoutProductPage from "layouts/LayoutProductPage";
// TYPES
import { QueryParameters } from "types/queryParams";
// OffersType
import { ProductType } from "types/productType";

type ProductSinglePageProps = {
  productData: ProductType;
};

/**
 * Product Single Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the Product Single Page.
 */
export default function ProductSinglePage(props: ProductSinglePageProps) {
  return <LayoutProductPage productData={props.productData} />;
}

// eslint-disable-next-line require-jsdoc
export async function getStaticProps(context: { params: { slug: any } }) {
  // PRODUCT DATA
  const getProductParam: QueryParameters = {
    slug: context.params.slug,
  };
  const getProduct = await fetchQuery(getProductBy(getProductParam));
  const getProductResponse = getProduct.props.data.productBy;

  // DATA RETURN
  return {
    props: {
      productData: getProductResponse,
    },
    revalidate: 604800, // ONE WEEK
  };
}

// eslint-disable-next-line require-jsdoc
export async function getStaticPaths() {
  const getAllProductsParams: QueryParameters = {
    first: 20,
  };
  const getProducts = await fetchQuery(getAllProducts(getAllProductsParams));
  const getProductsResponse = getProducts.props.data.products.nodes;

  const paths = getProductsResponse.map(
    (item: {
      product_info: { category: { slug: any }; subcategory: { slug: any } };
      slug: any;
    }) => ({
      params: {
        category: item.product_info.category.slug,
        subcategory: item.product_info.subcategory.slug,
        slug: item.slug,
      },
    })
  );

  return fetchPaths(paths);
}
