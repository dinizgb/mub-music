import { buildPageMetadata } from "lib/seo/buildPageMetadata";

describe("buildPageMetadata", () => {
  const originalDomain = process.env.NEXT_PUBLIC_ENV_DOMAIN;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = "mubmusic.com";
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = originalDomain;
  });

  it("builds canonical, openGraph, and twitter fields", () => {
    const metadata = buildPageMetadata({
      title: "News",
      description: "Daily news",
      path: "/news",
    });

    expect(metadata.alternates?.canonical).toBe("https://mubmusic.com/news");
    expect(metadata.openGraph?.url).toBe("https://mubmusic.com/news");
    expect(metadata.openGraph?.title).toBe("News | Mub Music");
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(metadata.description).toBe("Daily news");
  });

  it("supports absolute titles and article times", () => {
    const metadata = buildPageMetadata({
      title: { absolute: "Mub Music | Reviews, Offers & Specs" },
      description: "Headline",
      path: "/",
      type: "article",
      publishedTime: "2024-01-01T00:00:00.000Z",
      modifiedTime: "2024-01-02T00:00:00.000Z",
      image: "https://cdn.example/img.jpg",
    });

    expect(metadata.title).toEqual({
      absolute: "Mub Music | Reviews, Offers & Specs",
    });
    expect(metadata.openGraph?.images).toEqual(["https://cdn.example/img.jpg"]);
  });
});
