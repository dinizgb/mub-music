import { SimplifiedReviewerType } from "types/productType";
import getProductLdJson from "utils/getProductLdJson";

/**
 * Function to construct the response for the reviews Crawler.
 * @param {string} url with the url.
 * @param {SimplifiedReviewerType} currentValues with the current values.
 * @return {Promise}: With the promise of review crawler.
 */
export default async function reviewsCrawlerResponseConstructor(
  url: string,
  currentValues: SimplifiedReviewerType
) {
  return new Promise(async (resolve) => {
    const reviewCrawlerRequest = await fetch(
      `https://${process.env.NEXT_PUBLIC_ENV_ABSTRACT_ROOT_PATH}/v1/?api_key=${process.env.NEXT_PUBLIC_ENV_ABSTRACT_API_KEY}&url=${url}`
    );
    const reviewCrawlerResponse = await reviewCrawlerRequest.text();
    const reviewCrawlerResponseToString = String(reviewCrawlerResponse);
    const getLdJson = getProductLdJson(reviewCrawlerResponseToString);

    // CHECK FOR REVIEWS
    let reviewData: SimplifiedReviewerType;
    const currentReviewData: SimplifiedReviewerType = {
      count: currentValues.count,
      rating: currentValues.rating,
    };
    if (getLdJson.length > 0) {
      const aggregateRating = getLdJson[0].aggregateRating;
      aggregateRating.reviewCount
        ? (reviewData = {
            count: Number(aggregateRating.reviewCount),
            rating: parseFloat(aggregateRating.ratingValue),
          })
        : (reviewData = currentReviewData);
    } else {
      reviewData = currentReviewData;
    }
    // RETURN
    resolve(reviewData);
  });
}
