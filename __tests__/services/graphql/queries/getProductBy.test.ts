import getProductBy from "services/graphql/queries/getProductBy";

describe("getProductBy", () => {
  it("builds a productBy query including gallery and offers", () => {
    const query = getProductBy({ slug: "fender-stratocaster" });

    expect(query).toContain("query getProductBy");
    expect(query).toContain("productBy(");
    expect(query).toContain("fender-stratocaster");
    expect(query).toContain("productGallery");
    expect(query).toContain("offers");
    expect(query).toContain("reviews");
  });
});
