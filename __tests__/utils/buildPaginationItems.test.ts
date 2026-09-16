import { buildPaginationItems } from "utils/buildPaginationItems";

describe("buildPaginationItems", () => {
  it("returns every page when there are 9 or fewer pages", () => {
    expect(buildPaginationItems(1, 9)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("includes the next page when the current page is 4 of 10", () => {
    expect(buildPaginationItems(4, 10)).toEqual([1, 2, 3, 4, 5, 6, "...", 10]);
  });

  it("keeps page 7 visible in a 10-page list", () => {
    expect(buildPaginationItems(7, 10)).toContain(7);
    expect(buildPaginationItems(7, 10)).toContain(6);
    expect(buildPaginationItems(7, 10)).toContain(8);
  });

  it("returns no items when there is only one page", () => {
    expect(buildPaginationItems(1, 1)).toEqual([]);
  });
});
