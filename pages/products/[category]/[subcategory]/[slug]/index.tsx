/* eslint-disable react/prop-types */
import React from "react";
// SERVICES
import { fetchQuery } from "services/graphql/fetchQuery";
import getProductBy from "services/graphql/queries/getProductBy";
import getAllProducts from "services/graphql/queries/getAllProducts";
import reviewsCrawlerResponseConstructor from "services/crawlers/reviewsCrawlerResponseConstructor";
import offersCrawlerResponseConstructor from "services/crawlers/offersCrawlerResponseConstructor";
import { fetchPaths } from "services/core/fetchPaths";
// COMPONENTS
import LayoutProductPage from "layouts/LayoutProductPage";
// TYPES
import { QueryParameters } from "types/queryParams";
// OffersType
import {
  OffersType,
  ProductType,
  ReviewsType,
  SimplifiedOfferType,
  SimplifiedReviewerType,
} from "types/productType";
// UTILS
import differenceInDays from "utils/differenceInDays";

type ProductSinglePageProps = {
  offers: SimplifiedOfferType[];
  productData: ProductType;
  reviews: SimplifiedReviewerType[];
};

/**
 * Product Single Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the Product Single Page.
 */
export default function ProductSinglePage(props: ProductSinglePageProps) {
  return (
    <LayoutProductPage
      offersCrawlerData={props.offers}
      productData={props.productData}
      reviewsCrawlerData={props.reviews}
    />
  );
}

// eslint-disable-next-line require-jsdoc
export async function getStaticProps(context: { params: { slug: any } }) {
  // PRODUCT DATA
  const getProductParam: QueryParameters = {
    slug: context.params.slug,
  };
  const getProduct = await fetchQuery(getProductBy(getProductParam));
  const getProductResponse = getProduct.props.data.productBy;
  const lastModifiedInDays = differenceInDays(getProductResponse.modified);

  // REVIEWS DATA
  let getReviewsData;
  const reviewInfo: ReviewsType =
    getProductResponse.product_info.reviews.reviewInfo;
  const reviewsCurrentCounts = Object.values(reviewInfo)
    .map((reviewer) => reviewer.count)
    .filter((count) => count !== null && count !== undefined);
  const reviewsCurrentRates = Object.values(reviewInfo)
    .map((reviewer) => reviewer.rate)
    .filter((rate) => rate !== null && rate !== undefined);
  getReviewsData = reviewsCurrentCounts.map((reviewer, i) => ({
    count: reviewer,
    rating: reviewsCurrentRates[i],
  }));

  // OFFERS DATA
  let getOffersData;
  const offersInfo: OffersType =
    getProductResponse.product_info.offers.offersInfo;
  const offersCurrentPrices = Object.values(offersInfo)
    .map((offer) => offer.price)
    .filter((count) => count !== null && count !== undefined);
  getOffersData = offersCurrentPrices.map((offer) => ({
    price: offer,
  }));

  if (lastModifiedInDays >= 8) {
    // REVIEWS CRAWLER
    const reviewsUrls = Object.values(reviewInfo)
      .map((reviewer) => reviewer.url)
      .filter((url) => url !== null && url !== undefined);
    getReviewsData = await Promise.all(
      reviewsUrls.map((reviewsUrl, index) =>
        reviewsCrawlerResponseConstructor(reviewsUrl, {
          count: reviewsCurrentRates[index],
          rating: reviewsCurrentCounts[index],
        })
      )
    );

    // OFFERS CRAWLER - TODO: ADD POST RESQUEST TO SAVE OFFERS ON THE FIELD MONITOR
    const offersUrls = Object.values(offersInfo)
      .map((offer) => offer.url)
      .filter((url) => url !== null && url !== undefined);
    getOffersData = await Promise.all(
      offersUrls.map((offersUrl, index) =>
        offersCrawlerResponseConstructor(offersUrl, {
          price: offersCurrentPrices[index],
        })
      )
    );
  }

  // DATA RETURN
  return {
    props: {
      offers: getOffersData,
      productData: getProductResponse,
      reviews: getReviewsData,
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
