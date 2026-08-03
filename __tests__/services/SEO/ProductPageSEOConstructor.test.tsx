/* eslint-disable camelcase */
import { renderToStaticMarkup } from "react-dom/server";
import ProductPageSEOConstructor from "services/SEO/ProductPageSEOConstructor";

const productData = {
  id: "product-1",
  slug: "fender-stratocaster",
  title: "Fender Stratocaster",
  product_info: {
    category: { title: "Guitars", slug: "guitars" },
    subcategory: { title: "Electric", slug: "electric" },
    thumbnail: { sourceUrl: "https://cdn.example/strat.jpg" },
  },
} as any;

describe("ProductPageSEOConstructor", () => {
  const originalDomain = process.env.NEXT_PUBLIC_ENV_DOMAIN;

  beforeAll(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = "mub.example";
  });

  afterAll(() => {
    process.env.NEXT_PUBLIC_ENV_DOMAIN = originalDomain;
  });

  it("renders product SEO tags and JSON-LD scripts", () => {
    const html = renderToStaticMarkup(
      <ProductPageSEOConstructor productData={productData} />
    );

    expect(html).toContain('content="Fender Stratocaster | Mub Music"');
    expect(html).toContain(
      'href="https://mub.example/products/guitars/electric/fender-stratocaster"'
    );
    expect(html.match(/application\/ld\+json/g)).toHaveLength(2);
    expect(html).toContain("BreadcrumbList");
    expect(html).toContain('"@type":"Product"');
  });
});
