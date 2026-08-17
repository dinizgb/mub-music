import {
  articleMatchesRoute,
  productMatchesRoute,
  resolveAuthorName,
} from "lib/seo/matchCmsRoute";

describe("matchCmsRoute", () => {
  it("accepts matching news category/slug and rejects mismatches", () => {
    const article = {
      slug: "album-x",
      categories: { nodes: [{ slug: "releases", name: "Releases" }] },
    };
    expect(articleMatchesRoute(article, "releases", "album-x")).toBe(true);
    expect(articleMatchesRoute(article, "people", "album-x")).toBe(false);
    expect(articleMatchesRoute(article, "releases", "other")).toBe(false);
  });

  it("accepts matching product path slugs and rejects mismatches", () => {
    const product = {
      slug: "strat",
      product_info: {
        category: { slug: "guitars" },
        subcategory: { slug: "electric" },
      },
    };
    expect(productMatchesRoute(product, "guitars", "electric", "strat")).toBe(
      true
    );
    expect(productMatchesRoute(product, "drums", "electric", "strat")).toBe(
      false
    );
  });

  it("resolves author name from GraphQL author.node.name", () => {
    expect(
      resolveAuthorName({ node: { name: "Ada" } }, "Mub Music Staff")
    ).toBe("Ada");
    expect(resolveAuthorName({ name: "Legacy" }, "Mub Music Staff")).toBe(
      "Legacy"
    );
    expect(resolveAuthorName(null, "Mub Music Staff")).toBe("Mub Music Staff");
    expect(resolveAuthorName({ node: {} }, "Mub Music Staff")).toBe(
      "Mub Music Staff"
    );
  });
});
