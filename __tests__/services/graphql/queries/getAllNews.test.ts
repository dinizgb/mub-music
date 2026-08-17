import getAllNews from "services/graphql/queries/getAllNews";

describe("getAllNews", () => {
  it("builds a posts query with formatted params", () => {
    const query = getAllNews({ first: 5 });

    expect(query).toContain("query getAllNews");
    expect(query).toContain("posts(");
    expect(query).toContain("first: 5");
    expect(query).toContain("featuredImage");
    expect(query).toContain("categories");
  });

  it("supports cursor pagination fields used by the news sitemap", () => {
    const query = getAllNews({ first: 200, after: "cursor123" });

    expect(query).toContain("first: 200");
    expect(query).toContain('after: "cursor123"');
    expect(query).toContain("pageInfo");
    expect(query).toContain("hasNextPage");
    expect(query).toContain("endCursor");
  });
});
