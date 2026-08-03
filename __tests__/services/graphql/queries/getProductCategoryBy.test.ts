import getProductCategoryBy from "services/graphql/queries/getProductCategoryBy";

describe("getProductCategoryBy", () => {
  it("builds a productCategoryBy query for a slug", () => {
    const query = getProductCategoryBy({ slug: "guitars" });

    expect(query).toContain("query getProductCategoryBy");
    expect(query).toContain("productCategoryBy(");
    expect(query).toContain("guitars");
  });
});
