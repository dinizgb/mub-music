import { absoluteUrl } from "lib/seo/absoluteUrl";

describe("absoluteUrl", () => {
  const originalDomain = process.env.NEXT_PUBLIC_ENV_DOMAIN;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = "mubmusic.com";
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = originalDomain;
  });

  it("returns the site root with trailing slash by default", () => {
    expect(absoluteUrl()).toBe("https://mubmusic.com/");
  });

  it("adds a leading and trailing slash when missing", () => {
    expect(absoluteUrl("news")).toBe("https://mubmusic.com/news/");
  });

  it("preserves an already-normalized path", () => {
    expect(absoluteUrl("/products/guitars/")).toBe(
      "https://mubmusic.com/products/guitars/"
    );
  });

  it("does not force a trailing slash on sitemap files", () => {
    expect(absoluteUrl("/sitemap.xml")).toBe(
      "https://mubmusic.com/sitemap.xml"
    );
    expect(absoluteUrl("/news/sitemap.xml")).toBe(
      "https://mubmusic.com/news/sitemap.xml"
    );
  });
});
