import parseProductIds, { orderItemsByIds } from "utils/parseProductIds";

describe("parseProductIds", () => {
  it("parses a comma-separated list", () => {
    expect(parseProductIds("3610, 3601, 2834")).toEqual([3610, 3601, 2834]);
  });

  it("strips HTML from CMS content", () => {
    expect(
      parseProductIds(
        "<p>3610, 3601, 2834, 2760, 2126, 2046, 1991, 1836, 4218, 3328, 3392, 4000</p>\n"
      )
    ).toEqual([
      3610, 3601, 2834, 2760, 2126, 2046, 1991, 1836, 4218, 3328, 3392, 4000,
    ]);
  });

  it("returns an empty list for blank input", () => {
    expect(parseProductIds(undefined)).toEqual([]);
    expect(parseProductIds("")).toEqual([]);
  });

  it("ignores non-numeric tokens", () => {
    expect(parseProductIds("3610, abc, 0, -2, 3601")).toEqual([3610, 3601]);
  });
});

describe("orderItemsByIds", () => {
  it("keeps the curated id order and drops missing ids", () => {
    const items = [
      { databaseId: 3601, slug: "b" },
      { databaseId: 3610, slug: "a" },
    ];

    expect(
      orderItemsByIds(items, [3610, 999, 3601], (item) => item.databaseId)
    ).toEqual([
      { databaseId: 3610, slug: "a" },
      { databaseId: 3601, slug: "b" },
    ]);
  });
});
