/* eslint-disable camelcase */
import productFilterConstructor from "services/filters/productFilterConstructor";

const products = [
  {
    product_info: {
      brand: { slug: "fender", title: "Fender" },
      subcategory: { slug: "electric", title: "Electric" },
    },
  },
  {
    product_info: {
      brand: { slug: "gibson", title: "Gibson" },
      subcategory: { slug: "electric", title: "Electric" },
    },
  },
  {
    product_info: {
      brand: { slug: "fender", title: "Fender" },
      subcategory: { slug: "acoustic", title: "Acoustic" },
    },
  },
];

describe("productFilterConstructor", () => {
  it("builds unique brand filters with counts", () => {
    const result = productFilterConstructor(products, "brand");

    expect(result).toEqual([
      { count: 2, title: "Fender", slug: "fender" },
      { count: 1, title: "Gibson", slug: "gibson" },
    ]);
  });

  it("builds unique subcategory filters with counts", () => {
    const result = productFilterConstructor(products, "subcategory");

    expect(result).toEqual([
      { count: 1, title: "Acoustic", slug: "acoustic" },
      { count: 2, title: "Electric", slug: "electric" },
    ]);
  });

  it("returns an empty array when there are no products", () => {
    expect(productFilterConstructor([], "brand")).toEqual([]);
  });
});
