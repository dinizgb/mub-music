import { renderToStaticMarkup } from "react-dom/server";
import SEOTagsConstructor from "services/SEO/SEOTagsConstructor";

describe("SEOTagsConstructor", () => {
  const originalDomain = process.env.NEXT_PUBLIC_ENV_DOMAIN;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = "mub.example";
  });

  afterAll(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = originalDomain;
  });

  const baseProps = {
    pageTitle: "Products",
    pageExcerpt: "Find deals",
    pageType: "product",
    pagePath: "products",
    breadcrumbItemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mub.example/",
      },
    ],
  };

  it("uses the default avatar image when pageThumb is missing", () => {
    const html = renderToStaticMarkup(<SEOTagsConstructor {...baseProps} />);

    expect(html).toContain(
      'content="https://mub.example/images/mub-avatar.jpg"'
    );
    expect(html).toContain('href="https://mub.example/products/"');
    expect(html).toContain('type="application/ld+json"');
  });

  it("uses pageThumb for og:image when provided", () => {
    const html = renderToStaticMarkup(
      <SEOTagsConstructor
        {...baseProps}
        pageThumb="https://cdn.example/thumb.jpg"
      />
    );

    expect(html).toContain('content="https://cdn.example/thumb.jpg"');
  });
});
