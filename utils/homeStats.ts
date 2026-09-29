export type HomeStats = {
  products: number;
  offers: number;
  reviews: number;
};

export const OFFERS_PER_PRODUCT = 2;
export const REVIEWS_PER_PRODUCT = 3;

/**
 * Builds home hero stats from the published product total.
 * @param {number} productCount Published product count.
 * @return {HomeStats} Product, offer, and review counts.
 */
export function buildHomeStats(productCount: number): HomeStats {
  const products = Number.isFinite(productCount)
    ? Math.max(0, Math.floor(productCount))
    : 0;

  return {
    products,
    offers: products * OFFERS_PER_PRODUCT,
    reviews: products * REVIEWS_PER_PRODUCT,
  };
}
