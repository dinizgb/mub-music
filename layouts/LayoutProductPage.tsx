"use client";

import Image from "next/image";
import { Share2 } from "lucide-react";
// COMPONENTS
import { ContentBody } from "components/Texts/ContentBody";
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H1, H2 } from "components/Texts/Typographies";
import StarsWidget from "components/Widgets/StarsWidget";
import OffersSidebarList from "components/Lists/OffersSidebarList";
import ReviewsSidebarList from "components/Lists/ReviewsSidebarList";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import YoutubeIframe, {
  getYoutubeVideoId,
} from "components/Tags/YoutubeIframe";
// TYPES
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { ProductType, ReviewerType } from "types/productType";
import { OfferType } from "types/offerType";
import { i18n } from "@/i18n";
import { acfGroupItems } from "utils/acfGroupItems";
import { buildProductGallery } from "utils/buildProductGallery";

type LayoutProductPageProps = {
  productData: ProductType;
  productsCategories: ProductsCategoriesType[];
};

/**
 * Layout Product Page.
 * @param {LayoutProductPageProps} props to the component.
 * @return {TSX.Element}: The TSX code for the Layout Product Page.
 */
export default function LayoutProductPage(props: LayoutProductPageProps) {
  const productPrefix = props.productData;
  const featuredVideoId = getYoutubeVideoId(
    productPrefix.product_info.featureVideo
  );

  const productGallery = buildProductGallery(
    productPrefix.product_info.productGallery?.productGalleryInfo
  );

  const productReviews = productPrefix.product_info.reviews
    ? acfGroupItems<ReviewerType>(productPrefix.product_info.reviews.reviewInfo)
        .filter((item) => item.url && item.store)
        .map((item) => ({
          count: item.count,
          rate: item.rate,
          store: item.store.title,
          logo: item.store.storeInfo.logo.sourceUrl,
          url: item.url,
        }))
    : null;

  const productOffers = productPrefix.product_info.offers
    ? acfGroupItems<OfferType>(productPrefix.product_info.offers.offersInfo)
        .filter((item) => item.url && item.store)
        .map((item) => ({
          logo: item.store.storeInfo.logo.sourceUrl,
          price: item.price,
          store: item.store.title,
          url: item.url,
        }))
    : null;

  return (
    <>
      <Header productsCategories={props.productsCategories} />
      <div
        className="bg-secondary mb-5 w-full bg-[url(/images/placeholder-bg.jpg)]
          bg-fixed bg-position-[center_90%] py-6.5 md:mb-7.5
          max-md:[&_h1]:mt-3.75 max-md:[&_h1]:mb-1.25"
      >
        <div className="mx-auto w-full max-w-300 px-4">
          <div className="w-full">
            <div
              className="grid w-full grid-cols-1 items-center
                justify-items-center gap-4 text-center sm:grid-cols-12
                sm:justify-items-stretch sm:gap-6 sm:text-left"
            >
              <div
                className="flex flex-col items-center gap-5 sm:col-span-10
                  sm:flex-row sm:items-center md:col-span-10"
              >
                <div
                  className="max-xs:size-16 relative size-25 shrink-0
                    rounded-full max-sm:size-20 [&_img]:rounded-full"
                  style={{
                    backgroundColor:
                      productPrefix.product_info.brand.brand_info
                        .backgroundColor,
                  }}
                >
                  <Image
                    src={
                      productPrefix.product_info.brand.brand_info.thumbnail
                        .sourceUrl
                    }
                    alt={
                      productPrefix.product_info.brand.brand_info.thumbnail
                        .altText
                    }
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <H1
                  className="text-text-4"
                  fontWeight={400}
                  fontSize={36}
                  lineHeight={54}
                  xsFontSize={36}
                  xsLineHeight={54}
                >
                  {productPrefix.title}
                </H1>
              </div>
              <div className="sm:col-span-2 md:col-span-2">
                <div
                  className="flex flex-col items-center sm:items-end
                    max-md:[&_div_svg]:mt-0 max-md:[&_div_svg]:text-xl
                    [&_figure_svg]:mt-0.5 [&_figure_svg]:text-2xl"
                >
                  <H2
                    className="text-text-4 mt-0 mr-1.25 mb-2.5 sm:mt-2"
                    fontWeight={600}
                    fontSize={16}
                    lineHeight={21}
                    xsFontSize={16}
                    xsLineHeight={24}
                  >
                    {i18n.product.ratingAverage}
                  </H2>
                  <StarsWidget
                    fontSize={18}
                    number={productPrefix.product_info.rating}
                    withBackground={false}
                  />
                  <figure className="mt-2">
                    <Share2 />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-300 px-4">
        <div className="mb-4 w-full">
          <div
            className="grid w-full grid-cols-1 gap-5 sm:grid-cols-12 md:gap-8"
          >
            <div className="order-2 sm:order-1 sm:col-span-6 md:col-span-8">
              <div
                className="bg-secondary mb-5 rounded-lg px-7.5 py-5 md:mb-7.5"
              >
                <H2
                  className="text-text-4 mb-5"
                  fontWeight={600}
                  fontSize={21}
                  lineHeight={36}
                  xsFontSize={21}
                  xsLineHeight={36}
                >
                  {i18n.product.photos}
                </H2>
                <ImageGallery
                  items={productGallery}
                  showIndex={true}
                  showPlayButton={false}
                />
              </div>
              {featuredVideoId ? (
                <div
                  className="bg-secondary mb-5 rounded-lg px-7.5 py-5 md:mb-7.5"
                >
                  <H2
                    className="text-text-4 mb-5"
                    fontWeight={600}
                    fontSize={21}
                    lineHeight={36}
                    xsFontSize={21}
                    xsLineHeight={36}
                  >
                    {i18n.product.featuredVideo}
                  </H2>
                  <YoutubeIframe
                    url={productPrefix.product_info.featureVideo}
                  />
                </div>
              ) : null}
              <div
                className="bg-secondary mb-5 rounded-lg px-7.5 py-5 md:mb-7.5"
              >
                <H2
                  className="text-text-4"
                  fontWeight={600}
                  fontSize={21}
                  lineHeight={36}
                  xsFontSize={21}
                  xsLineHeight={36}
                >
                  {i18n.product.description}
                </H2>
                <ContentBody
                  dangerouslySetInnerHTML={{
                    __html: productPrefix.product_info.description,
                  }}
                />
              </div>
              <div
                className="bg-secondary mb-5 rounded-lg px-7.5 py-5 md:mb-7.5"
              >
                <H2
                  className="text-text-4"
                  fontWeight={600}
                  fontSize={21}
                  lineHeight={36}
                  xsFontSize={21}
                  xsLineHeight={36}
                >
                  {i18n.product.specifications}
                </H2>
                <ContentBody
                  dangerouslySetInnerHTML={{
                    __html: productPrefix.product_info.specifications,
                  }}
                />
              </div>
            </div>
            <div className="order-1 sm:order-2 sm:col-span-6 md:col-span-4">
              <OffersSidebarList
                data={productOffers ?? []}
                isPrimaryTitle={productOffers ? true : false}
                title={i18n.product.offersAvailable}
              />
              <ReviewsSidebarList
                data={productReviews ?? []}
                isPrimaryTitle={false}
                title={i18n.product.reviews}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
