import getAllProductFiltersInfos from "services/graphql/queries/getAllProductFiltersInfos";

describe("getAllProductFiltersInfos", () => {
  it("builds a products filters info query", () => {
    const query = getAllProductFiltersInfos({
      where: { catSlug: "guitars" },
    });

    expect(query).toContain("query getAllProductFiltersInfos");
    expect(query).toContain("products(");
    expect(query).toContain("brand");
    expect(query).toContain("priceAverage");
    expect(query).toContain("guitars");
  });
});
