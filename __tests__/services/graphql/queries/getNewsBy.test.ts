import getNewsBy from "services/graphql/queries/getNewsBy";

describe("getNewsBy", () => {
  it("builds a postBy query for a slug", () => {
    const query = getNewsBy({ slug: "sample-article" });

    expect(query).toContain("query getNewsBy");
    expect(query).toContain("postBy(");
    expect(query).toContain("sample-article");
    expect(query).toContain("content(format: RENDERED)");
  });
});
