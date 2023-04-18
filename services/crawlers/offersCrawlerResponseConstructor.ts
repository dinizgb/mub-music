import { SimplifiedOfferType } from "types/productType";
import getProductLdJson from "utils/getProductLdJson";

/**
 * Function to construct the response for the offers Crawler.
 * @param {string} url with the url.
 * @param {SimplifiedOfferType} currentValues with the current values.
 * @return {Promise}: With the promise of offer crawler.
 */
export default async function offersCrawlerResponseConstructor(
  url: string,
  currentValues: SimplifiedOfferType
) {
  return new Promise(async (resolve) => {
    const offerCrawlerRequest = await fetch(
      `https://${process.env.NEXT_PUBLIC_ENV_ABSTRACT_ROOT_PATH}/v1/?api_key=${process.env.NEXT_PUBLIC_ENV_ABSTRACT_API_KEY}&url=${url}`
    );
    const offerCrawlerResponse = await offerCrawlerRequest.text();
    const offerCrawlerResponseToString = String(offerCrawlerResponse);
    const getLdJson = getProductLdJson(offerCrawlerResponseToString);

    // CHECK FOR OFFERS
    let offerData: SimplifiedOfferType;
    const currentOfferData: SimplifiedOfferType = {
      price: currentValues.price,
    };
    if (getLdJson.length > 0) {
      const offers = getLdJson[0].offers;
      if (Array.isArray(offers)) {
        offers[0].price
          ? (offerData = {
              price: Number(offers[0].price),
            })
          : (offerData = currentOfferData);
      } else {
        offerData = { price: Number(offers.lowPrice) };
      }
    } else {
      offerData = currentOfferData;
    }
    // RETURN
    resolve(offerData);
  });
}
