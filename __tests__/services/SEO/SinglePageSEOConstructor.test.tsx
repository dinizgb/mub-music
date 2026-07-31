import { renderToStaticMarkup } from "react-dom/server";
import SinglePageSEOConstructor from "services/SEO/SinglePageSEOConstructor";

describe("SinglePageSEOConstructor", () => {
  const originalDomain = process.env.NEXT_PUBLIC_ENV_DOMAIN;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = "mub.example";
  });

  afterAll(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = originalDomain;
  });

  const baseProps = {
    singlePageTitle: "Sample Article",
    singlePageExcerpt: "Excerpt text",
    singlePageSectionName: "News",
    singlePageSectionSlug: "news",
    singlePageCategoryName: "Tech",
    singlePageCategorySlug: "tech",
    singlePageSlug: "sample-article",
    singlePageDate: "2022-04-28T14:40:50",
    singlePageModifiedDate: "2022-04-29T10:00:00",
    singlePageFeaturedImage: "https://cdn.example/article.jpg",
    singlePageAuthor: "Mub Staff",
  };

  it("renders canonical and article meta for a full article path", () => {
    const html = renderToStaticMarkup(
      <SinglePageSEOConstructor {...baseProps} />
    );

    expect(html).toContain(
      'href="https://mub.example/news/tech/sample-article/"'
    );
    expect(html).toContain('content="Sample Article | Mub Music"');
    expect(html.match(/application\/ld\+json/g)).toHaveLength(2);
  });

  it("builds a shorter canonical when category and slug are omitted", () => {
    const html = renderToStaticMarkup(
      <SinglePageSEOConstructor
        {...baseProps}
        singlePageCategorySlug={undefined}
        singlePageSlug={undefined}
      />
    );

    expect(html).toContain('href="https://mub.example/news/"');
  });

  it("places the article breadcrumb at position 3 when category is omitted", () => {
    const html = renderToStaticMarkup(
      <SinglePageSEOConstructor
        {...baseProps}
        singlePageCategorySlug={undefined}
        singlePageCategoryName={undefined}
      />
    );

    expect(html).toContain('href="https://mub.example/news/sample-article/"');
    expect(html).toContain('"position":3');
    expect(html).toContain('"name":"Sample Article"');
  });
});
