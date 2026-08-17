import { buildBreadcrumbJsonLd } from "lib/seo/jsonld/breadcrumb";

describe("buildBreadcrumbJsonLd", () => {
  it("assigns positions starting at 1", () => {
    const schema = buildBreadcrumbJsonLd([
      { name: "Home", item: "https://mubmusic.com/" },
      { name: "News", item: "https://mubmusic.com/news/" },
    ]);

    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mubmusic.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "News",
        item: "https://mubmusic.com/news/",
      },
    ]);
  });
});
