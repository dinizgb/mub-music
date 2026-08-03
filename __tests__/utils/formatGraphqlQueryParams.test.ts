import formatGraphqlQueryParams from "utils/formatGraphqlQueryParams";

describe("formatGraphqlQueryParams", () => {
  it("formats a simple object into a GraphQL params string", () => {
    const result = formatGraphqlQueryParams({ first: 5 });
    expect(result).toBe("first: 5");
  });

  it("formats nested objects", () => {
    const result = formatGraphqlQueryParams({
      where: { categoryName: "tech" },
    });
    expect(result).toContain("where:");
    expect(result).toContain("categoryName:");
    expect(result).toContain("tech");
  });
});
