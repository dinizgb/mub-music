/* eslint-disable camelcase */
import productInfoObjValueCount from "utils/productInfoObjValueCount";

describe("productInfoObjValueCount", () => {
  const products = [
    { product_info: { brand: { slug: "fender" } } },
    { product_info: { brand: { slug: "gibson" } } },
    { product_info: { brand: { slug: "fender" } } },
  ];

  it("counts how many times a property slug appears", () => {
    expect(productInfoObjValueCount(products, "brand", "fender")).toBe(2);
    expect(productInfoObjValueCount(products, "brand", "gibson")).toBe(1);
    expect(productInfoObjValueCount(products, "brand", "yamaha")).toBe(0);
  });
});
