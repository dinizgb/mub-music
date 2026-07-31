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
});
