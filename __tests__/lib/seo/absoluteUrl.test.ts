import { absoluteUrl } from "lib/seo/absoluteUrl";

describe("absoluteUrl", () => {
  const originalDomain = process.env.NEXT_PUBLIC_ENV_DOMAIN;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = "mubmusic.com";
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = originalDomain;
  });

  it("returns the site root without a trailing slash by default", () => {
    expect(absoluteUrl()).toBe("https://mubmusic.com");
  });

  it("adds a leading slash and strips trailing slashes", () => {
    expect(absoluteUrl("news")).toBe("https://mubmusic.com/news");
    expect(absoluteUrl("/news/")).toBe("https://mubmusic.com/news");
  });

  it("normalizes nested paths without a trailing slash", () => {
    expect(absoluteUrl("/products/guitars/")).toBe(
      "https://mubmusic.com/products/guitars"
    );
  });

  it("keeps sitemap and file paths without forcing a trailing slash", () => {
    expect(absoluteUrl("/sitemap.xml")).toBe(
      "https://mubmusic.com/sitemap.xml"
    );
    expect(absoluteUrl("/news/sitemap.xml")).toBe(
      "https://mubmusic.com/news/sitemap.xml"
    );
    expect(absoluteUrl("/images/home-art.png")).toBe(
      "https://mubmusic.com/images/home-art.png"
    );
  });
});
