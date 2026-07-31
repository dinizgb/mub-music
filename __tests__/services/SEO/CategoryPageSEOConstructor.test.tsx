import { renderToStaticMarkup } from "react-dom/server";
import CategoryPageSEOConstructor from "services/SEO/CategoryPageSEOConstructor";

describe("CategoryPageSEOConstructor", () => {
  const originalDomain = process.env.NEXT_PUBLIC_ENV_DOMAIN;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = "mub.example";
  });

  afterAll(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = originalDomain;
  });

  it("renders category meta tags with slug in the og:url", () => {
    const html = renderToStaticMarkup(
      <CategoryPageSEOConstructor
        categoryPageTitle="Tech"
        categoryPageExcerpt="Tech news"
        categoryPageSectionSlug="news"
        categoryPageSlug="tech"
      />
    );

    expect(html).toContain('content="Tech news"');
    expect(html).toContain('content="Tech | Mub Music"');
    expect(html).toContain('content="https://mub.example/news/tech/"');
  });

  it("omits category slug from og:url when empty", () => {
    const html = renderToStaticMarkup(
      <CategoryPageSEOConstructor
        categoryPageTitle="News"
        categoryPageExcerpt="All news"
        categoryPageSectionSlug="news"
        categoryPageSlug=""
      />
    );

    expect(html).toContain('content="https://mub.example/news/"');
  });
});
