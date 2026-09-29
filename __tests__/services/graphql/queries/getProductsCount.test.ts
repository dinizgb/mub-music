import getProductsCount from "services/graphql/queries/getProductsCount";

describe("getProductsCount", () => {
  it("requests only the products offset pagination total", () => {
    const query = getProductsCount({ first: 1 });

    expect(query).toContain("query getProductsCount");
    expect(query).toContain("products(");
    expect(query).toContain("first: 1");
    expect(query).toContain("offsetPagination");
    expect(query).toContain("total");
    expect(query).not.toContain("product_info");
  });
});
