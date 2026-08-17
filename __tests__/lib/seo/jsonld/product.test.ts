/* eslint-disable camelcase */
import { buildProductJsonLd } from "lib/seo/jsonld/product";
import { ProductType } from "types/productType";

describe("buildProductJsonLd", () => {
  const baseProduct = {
    id: "1",
    slug: "fender-stratocaster",
    title: "Fender Stratocaster",
    product_info: {
      description: "<p>A classic guitar</p>",
      rating: 4.5,
      thumbnail: { sourceUrl: "https://cdn.example/strat.jpg" },
      brand: { title: "Fender", brand_info: { title: "Fender" } },
      offers: {
        offersInfo: {
          id: "x",
          offer1: {
            price: 999,
            url: "https://store.example/1",
            store: { title: "Store" },
          },
          offer2: { price: null, url: null },
        },
      },
      reviews: {
        reviewInfo: {
          id: "y",
          reviewer1: { count: 10, rate: 5, url: "https://reviews.example/1" },
          reviewer2: { count: null, url: null },
        },
      },
    },
  } as unknown as ProductType;

  it("includes real fields and omits empty offers/reviews", () => {
    const schema = buildProductJsonLd(
      baseProduct,
      "https://mubmusic.com/products/guitars/electric/fender-stratocaster/"
    );

    expect(schema["@type"]).toBe("Product");
    expect(schema.description).toBe("A classic guitar");
    expect(schema.brand).toEqual({ "@type": "Brand", name: "Fender" });
    expect(schema.offers).toMatchObject({
      "@type": "AggregateOffer",
      offerCount: 1,
      lowPrice: 999,
      highPrice: 999,
    });
    const offers = (schema.offers as { offers: Array<Record<string, unknown>> })
      .offers;
    expect(offers).toHaveLength(1);
    expect(offers[0]).toEqual({
      "@type": "Offer",
      priceCurrency: "USD",
      price: 999,
      url: "https://store.example/1",
    });
    expect(offers[0].availability).toBeUndefined();
    expect(schema.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.5,
      reviewCount: 10,
    });
  });

  it("keeps URL-only offers but omits price and invented availability", () => {
    const product = {
      ...baseProduct,
      product_info: {
        ...baseProduct.product_info,
        offers: {
          offersInfo: {
            id: "x",
            offer1: {
              price: null,
              url: "https://store.example/no-price",
              store: { title: "Store" },
            },
          },
        },
        reviews: undefined,
        rating: 0,
      },
    } as unknown as ProductType;

    const schema = buildProductJsonLd(
      product,
      "https://mubmusic.com/products/guitars/electric/fender-stratocaster"
    );

    expect(schema.offers).toMatchObject({
      "@type": "AggregateOffer",
      offerCount: 1,
    });
    const aggregate = schema.offers as {
      lowPrice?: number;
      highPrice?: number;
      offers: Array<Record<string, unknown>>;
    };
    expect(aggregate.lowPrice).toBeUndefined();
    expect(aggregate.highPrice).toBeUndefined();
    expect(aggregate.offers[0]).toEqual({
      "@type": "Offer",
      priceCurrency: "USD",
      url: "https://store.example/no-price",
    });
    expect(aggregate.offers[0]).not.toHaveProperty("price");
    expect(aggregate.offers[0]).not.toHaveProperty("availability");
  });

  it("falls back to title when description is empty and omits offers", () => {
    const product = {
      ...baseProduct,
      product_info: {
        ...baseProduct.product_info,
        description: "",
        rating: 0,
        offers: undefined,
        reviews: undefined,
        brand: undefined,
      },
    } as unknown as ProductType;

    const schema = buildProductJsonLd(
      product,
      "https://mubmusic.com/products/guitars/electric/fender-stratocaster/"
    );

    expect(schema.description).toBe("Fender Stratocaster");
    expect(schema.offers).toBeUndefined();
    expect(schema.aggregateRating).toBeUndefined();
    expect(schema.brand).toBeUndefined();
  });
});
