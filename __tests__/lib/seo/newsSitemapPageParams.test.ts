import { newsSitemapPageParams } from "lib/seo/newsSitemapPageParams";

describe("newsSitemapPageParams", () => {
  it("uses first only on the first page", () => {
    expect(newsSitemapPageParams(200, null)).toEqual({ first: 200 });
  });

  it("adds after on subsequent pages", () => {
    expect(newsSitemapPageParams(200, "cursor123")).toEqual({
      first: 200,
      after: "cursor123",
    });
  });
});
