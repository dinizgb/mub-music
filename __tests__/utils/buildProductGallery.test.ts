import { buildProductGallery } from "utils/buildProductGallery";

describe("buildProductGallery", () => {
  it("keeps gallery images and skips empty ACF slots and typename metadata", () => {
    expect(
      buildProductGallery({
        __typename: "ProductGalleryInfo",
        img1: { image: { sourceUrl: "https://cdn.example/a.webp" } },
        img2: { image: { sourceUrl: "https://cdn.example/b.webp" } },
        img3: { image: null, color: null },
        img4: { color: { id: "color-1" } },
      })
    ).toEqual([
      {
        original: "https://cdn.example/a.webp",
        thumbnail: "https://cdn.example/a.webp",
      },
      {
        original: "https://cdn.example/b.webp",
        thumbnail: "https://cdn.example/b.webp",
      },
    ]);
  });

  it("does not crash when typename is not the first key", () => {
    expect(
      buildProductGallery({
        img1: { image: { sourceUrl: "https://cdn.example/a.webp" } },
        __typename: "ProductGalleryInfo",
      })
    ).toEqual([
      {
        original: "https://cdn.example/a.webp",
        thumbnail: "https://cdn.example/a.webp",
      },
    ]);
  });
});
