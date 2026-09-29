import { acfGroupItems } from "utils/acfGroupItems";

describe("acfGroupItems", () => {
  it("skips typename metadata and non-object values", () => {
    expect(
      acfGroupItems({
        img1: { image: { sourceUrl: "https://cdn.example/a.webp" } },
        __typename: "ProductGalleryInfo",
      })
    ).toEqual([{ image: { sourceUrl: "https://cdn.example/a.webp" } }]);
  });
});
