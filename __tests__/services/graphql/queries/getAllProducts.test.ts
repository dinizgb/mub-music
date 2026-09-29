import getAllProducts from "services/graphql/queries/getAllProducts";

describe("getAllProducts", () => {
  it("builds a products query with formatted params", () => {
    const query = getAllProducts({ first: 12 });

    expect(query).toContain("query getAllProducts");
    expect(query).toContain("products(");
    expect(query).toContain("first: 12");
    expect(query).toContain("product_info");
    expect(query).toContain("offsetPagination");
    expect(query).toContain("databaseId");
  });

  it("includes a list of product database ids", () => {
    const query = getAllProducts({
      first: 3,
      where: { in: [3610, 3601, 2834] },
    });

    expect(query).toContain("in: [3610,3601,2834]");
  });
});
