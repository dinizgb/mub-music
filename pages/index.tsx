import React from "react";

// COMPONENTS
import LayoutHomePage from "layouts/LayoutHomePage";

// SERVICES
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllNews from "services/graphql/queries/getAllNews";
import getAllProducts from "services/graphql/queries/getAllProducts";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";

// TYPES
import { QueryParameters } from "types/queryParams";
import { ProductsCategoriesType } from "types/productsCategoriesType";

/**
 * Website Index Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the Home Page.
 */
export default function HomePage(props: any) {
  return (
    <LayoutHomePage
      postData={props.lastFiveNews}
      productData={props.lastProducts}
      productsCategories={props.productCategories}
      layoutDescription={"Mub Music is on the way..."}
    />
  );
}

// eslint-disable-next-line require-jsdoc
export async function getStaticProps() {
  // NEWS
  const lastFiveNewsParams: QueryParameters = {
    first: 5,
  };
  const lastFiveNews = await fetchQuery(getAllNews(lastFiveNewsParams));
  const lastFiveNewsResponse = lastFiveNews.props.data.posts.nodes;

  // PRODUCTS
  const lastProductsParams: QueryParameters = {
    first: 11,
  };
  const lastProducts = await fetchQuery(getAllProducts(lastProductsParams));
  const lastProductsResponse = lastProducts.props.data.products.nodes;

  // PRODUCT CATEGORIES
  const getProductCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };
  const getProductCategories = await fetchQuery(
    getAllProductCategories(getProductCategoriesParams)
  );
  const getProductCategoriesResponse: ProductsCategoriesType[] =
    getProductCategories.props.data.productCategories.nodes;

  return {
    props: {
      lastFiveNews: lastFiveNewsResponse,
      lastProducts: lastProductsResponse,
      productCategories: getProductCategoriesResponse,
    },
  };
}
