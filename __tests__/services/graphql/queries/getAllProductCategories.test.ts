import getAllProductCategories from "services/graphql/queries/getAllProductCategories";

describe("getAllProductCategories", () => {
  it("builds a productCategories query", () => {
    const query = getAllProductCategories({
      where: { offsetPagination: { size: 100, offset: 1 } },
    });

    expect(query).toContain("query getAllProductCategories");
    expect(query).toContain("productCategories(");
    expect(query).toContain("product_category_info");
    expect(query).toContain("offsetPagination");
  });
});
