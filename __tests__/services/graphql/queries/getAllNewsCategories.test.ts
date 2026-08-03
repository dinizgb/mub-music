import getAllNewsCategories from "services/graphql/queries/getAllNewsCategories";

describe("getAllNewsCategories", () => {
  it("builds a categories query without params", () => {
    const query = getAllNewsCategories();

    expect(query).toContain("query getAllNewsCategories");
    expect(query).toContain("categories");
    expect(query).toContain("slug");
  });
});
