import {
  newsArticlePath,
  productDetailPath,
  slugsMatch,
} from "lib/seo/routeSlugs";

describe("routeSlugs", () => {
  it("builds news and product paths from CMS slugs", () => {
    expect(newsArticlePath("releases", "album-x")).toBe(
      "/news/releases/album-x"
    );
    expect(productDetailPath("guitars", "electric", "strat")).toBe(
      "/products/guitars/electric/strat"
    );
  });

  it("compares route params to CMS slugs", () => {
    expect(slugsMatch(["guitars", "electric"], ["guitars", "electric"])).toBe(
      true
    );
    expect(slugsMatch(["guitars", "electric"], ["drums", "electric"])).toBe(
      false
    );
  });
});
