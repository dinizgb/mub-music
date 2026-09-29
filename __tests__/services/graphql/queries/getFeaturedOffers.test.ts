import getFeaturedOffers from "services/graphql/queries/getFeaturedOffers";

describe("getFeaturedOffers", () => {
  it("builds a featuredOffers query", () => {
    const query = getFeaturedOffers({ first: 1 });

    expect(query).toContain("query getFeaturedOffers");
    expect(query).toContain("featuredOffers(");
    expect(query).toContain("first: 1");
    expect(query).toContain("content");
  });
});
