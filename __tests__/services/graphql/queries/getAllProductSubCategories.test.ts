import getAllProductSubCategories from "services/graphql/queries/getAllProductSubCategories";

describe("getAllProductSubCategories", () => {
  it("builds a prodSubCategories query", () => {
    const query = getAllProductSubCategories({ first: 20 });

    expect(query).toContain("query getAllProductSubCategories");
    expect(query).toContain("prodSubCategories(");
    expect(query).toContain("first: 20");
  });
});
