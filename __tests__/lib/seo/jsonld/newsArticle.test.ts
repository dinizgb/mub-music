import { buildNewsArticleJsonLd } from "lib/seo/jsonld/newsArticle";

describe("buildNewsArticleJsonLd", () => {
  const originalDomain = process.env.NEXT_PUBLIC_ENV_DOMAIN;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = "staging.mubmusic.com";
  });

  afterAll(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = originalDomain;
  });

  it("builds a NewsArticle schema", () => {
    const schema = buildNewsArticleJsonLd({
      title: "Concert Halls",
      description: "A history of design",
      image: "https://cdn.example/hall.jpg",
      datePublished: "2024-01-01T00:00:00.000Z",
      dateModified: "2024-01-02T00:00:00.000Z",
      authorName: "Mub Music Staff",
      sectionName: "News",
      url: "https://staging.mubmusic.com/news/history/concert-halls",
    });

    expect(schema["@type"]).toBe("NewsArticle");
    expect(schema.headline).toBe("Concert Halls");
    expect(schema.image).toBe("https://cdn.example/hall.jpg");
    expect(schema.author).toEqual({
      "@type": "Person",
      name: "Mub Music Staff",
    });
    expect(schema.publisher).toEqual({
      "@type": "Organization",
      name: "Mub Music",
      url: "https://staging.mubmusic.com/",
    });
  });

  it("omits image when missing", () => {
    const schema = buildNewsArticleJsonLd({
      title: "Concert Halls",
      description: "A history of design",
      datePublished: "2024-01-01T00:00:00.000Z",
      dateModified: "2024-01-02T00:00:00.000Z",
      authorName: "Mub Music Staff",
      sectionName: "News",
      url: "https://staging.mubmusic.com/news/history/concert-halls",
    });

    expect(schema.image).toBeUndefined();
  });
});
