import htmlTagCleaner from "utils/htmlTagCleaner";
import truncateMetaDescription from "utils/truncateMetaDescription";
import { ProductType } from "types/productType";

type OfferLike = {
  price?: number | null;
  url?: string | null;
};

type ReviewLike = {
  count?: number | null;
  rate?: number | null;
  url?: string | null;
};

/**
 * Collects nested offer/review entries that include a URL.
 * @param {Record<string, unknown> | null | undefined} bag Nested CMS object.
 * @return {Array<Record<string, unknown>>} Filtered entries.
 */
function collectUrlEntries(
  bag: Record<string, unknown> | null | undefined
): Array<Record<string, unknown>> {
  if (!bag || typeof bag !== "object") return [];
  return Object.values(bag).filter(
    (value): value is Record<string, unknown> => {
      if (!value || typeof value !== "object") return false;
      const url = (value as { url?: unknown }).url;
      return typeof url === "string" && url.length > 0;
    }
  );
}

/**
 * Builds Product JSON-LD from live product data. Omits unknown fields.
 * @param {ProductType} product Product entity.
 * @param {string} url Canonical product URL.
 * @return {Record<string, unknown>} Schema.org Product.
 */
export function buildProductJsonLd(
  product: ProductType,
  url: string
): Record<string, unknown> {
  const info = product.product_info;
  const descriptionSource = info?.description
    ? htmlTagCleaner(info.description).trim()
    : "";
  const description = truncateMetaDescription(
    descriptionSource || product.title
  );
  const image = info?.thumbnail?.sourceUrl;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description,
    url,
  };

  if (image) {
    schema.image = image;
  }

  const brandTitle = info?.brand?.title || info?.brand?.brand_info?.title;
  if (brandTitle) {
    schema.brand = {
      "@type": "Brand",
      name: brandTitle,
    };
  }

  const offers = collectUrlEntries(
    info?.offers?.offersInfo as unknown as Record<string, unknown>
  ) as OfferLike[];
  if (offers.length > 0) {
    const prices = offers
      .map((offer) => offer.price)
      .filter((price): price is number => typeof price === "number");
    const aggregate: Record<string, unknown> = {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      offerCount: offers.length,
      offers: offers.map((offer) => {
        const entry: Record<string, unknown> = {
          "@type": "Offer",
          priceCurrency: "USD",
          url: offer.url,
        };
        if (typeof offer.price === "number") {
          entry.price = offer.price;
        }
        return entry;
      }),
    };
    if (prices.length > 0) {
      aggregate.lowPrice = Math.min(...prices);
      aggregate.highPrice = Math.max(...prices);
    }
    schema.offers = aggregate;
  }

  const reviews = collectUrlEntries(
    info?.reviews?.reviewInfo as unknown as Record<string, unknown>
  ) as ReviewLike[];
  const ratingValue =
    typeof info?.rating === "number" && info.rating > 0 ? info.rating : null;
  const reviewCount = reviews.reduce(
    (sum, review) =>
      sum + (typeof review.count === "number" ? review.count : 0),
    0
  );

  if (ratingValue !== null && reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
    };
  }

  return schema;
}
