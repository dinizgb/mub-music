import removeDuplicatesObjectsFromArray from "utils/removeDuplicatesObjectsFromArray";

describe("removeDuplicatesObjectsFromArray", () => {
  it("removes objects with duplicate slug values", () => {
    const input = [
      { slug: "a", title: "First" },
      { slug: "b", title: "Second" },
      { slug: "a", title: "Duplicate" },
    ];

    expect(removeDuplicatesObjectsFromArray(input)).toEqual([
      { slug: "a", title: "First" },
      { slug: "b", title: "Second" },
    ]);
  });

  it("returns the same array when there are no duplicates", () => {
    const input = [
      { slug: "a", title: "First" },
      { slug: "b", title: "Second" },
    ];

    expect(removeDuplicatesObjectsFromArray(input)).toEqual(input);
  });
});
