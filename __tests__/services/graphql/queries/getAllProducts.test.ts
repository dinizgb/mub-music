import getAllProducts from "services/graphql/queries/getAllProducts";

describe("getAllProducts", () => {
  it("builds a products query with formatted params", () => {
    const query = getAllProducts({ first: 11 });

    expect(query).toContain("query getAllProducts");
    expect(query).toContain("products(");
    expect(query).toContain("first: 11");
    expect(query).toContain("product_info");
    expect(query).toContain("offsetPagination");
  });
});
