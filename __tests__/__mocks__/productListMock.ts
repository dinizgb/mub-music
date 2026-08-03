/* eslint-disable camelcase */
export const productListMock = [
  {
    title: "Fender Stratocaster",
    slug: "fender-stratocaster",
    product_info: {
      rating: 4.5,
      price: 999,
      thumbnail: {
        sourceUrl: "https://example.com/strat.jpg",
      },
      brand: {
        brand_info: {
          thumbnail: { sourceUrl: "https://example.com/fender-logo.jpg" },
          backgroundColor: "#000000",
        },
      },
      category: { slug: "guitars", title: "Guitars" },
      subcategory: { slug: "electric", title: "Electric" },
    },
  },
  {
    title: "Gibson Les Paul",
    slug: "gibson-les-paul",
    product_info: {
      rating: 5,
      price: 2499,
      thumbnail: {
        sourceUrl: "https://example.com/lespaul.jpg",
      },
      brand: {
        brand_info: {
          thumbnail: { sourceUrl: "https://example.com/gibson-logo.jpg" },
          backgroundColor: "#111111",
        },
      },
      category: { slug: "guitars", title: "Guitars" },
      subcategory: { slug: "electric", title: "Electric" },
    },
  },
];
