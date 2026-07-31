import getAllSearchProducts from "services/graphql/queries/getAllSearchProducts";

describe("getAllSearchProducts", () => {
  it("builds a search products query", () => {
    const query = getAllSearchProducts({
      first: 10,
      where: { search: "strat" },
    });

    expect(query).toContain("query getAllSearchProducts");
    expect(query).toContain("products(");
    expect(query).toContain("search");
    expect(query).toContain("strat");
  });
});
