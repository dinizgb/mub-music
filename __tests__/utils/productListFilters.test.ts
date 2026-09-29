import {
  buildProductListWhere,
  getPriceAveragePageIds,
  resolveProductListFilterHref,
  resolveSubcategoryFilterHref,
  withoutProductListFilter,
  withProductListFilter,
} from "utils/productListFilters";

describe("withProductListFilter", () => {
  it("sets the price average query param and clears pagination", () => {
    expect(
      withProductListFilter(
        "/products/guitars/electric-guitars/",
        "brand=fender&page=3",
        "priceAverage",
        "500-1000"
      )
    ).toBe(
      "/products/guitars/electric-guitars/?brand=fender&priceAverage=500-1000"
    );
  });
});

describe("withoutProductListFilter", () => {
  it("removes a filter query param and pagination", () => {
    expect(
      withoutProductListFilter(
        "/products/guitars/electric-guitars/",
        "brand=fender&priceAverage=500-1000&page=2",
        "priceAverage"
      )
    ).toBe("/products/guitars/electric-guitars/?brand=fender");
  });
});

describe("resolveProductListFilterHref", () => {
  it("clears the filter when the selected value is clicked again", () => {
    expect(
      resolveProductListFilterHref({
        pathname: "/products/guitars/electric-guitars/",
        currentSearch: "brand=fender",
        key: "brand",
        value: "fender",
        selectedValue: "fender",
      })
    ).toBe("/products/guitars/electric-guitars/");
  });

  it("applies the filter when a different value is clicked", () => {
    expect(
      resolveProductListFilterHref({
        pathname: "/products/guitars/electric-guitars/",
        currentSearch: "brand=fender",
        key: "brand",
        value: "gibson",
        selectedValue: "fender",
      })
    ).toBe("/products/guitars/electric-guitars/?brand=gibson");
  });
});

describe("resolveSubcategoryFilterHref", () => {
  it("returns to the category list when the selected subcategory is cleared", () => {
    expect(
      resolveSubcategoryFilterHref(
        "guitars",
        "electric-guitars",
        "electric-guitars",
        "brand=fender"
      )
    ).toBe("/products/guitars/?brand=fender");
  });
});

describe("buildProductListWhere", () => {
  it("includes subcategory and brand slugs", () => {
    expect(
      buildProductListWhere({
        category: "guitars",
        subcategory: "electric-guitars",
        brand: "fender",
        offset: 20,
      })
    ).toEqual({
      catSlug: "guitars",
      subCatSlug: "electric-guitars",
      brandSlug: "fender",
      offsetPagination: { size: 20, offset: 20 },
    });
  });

  it("omits optional filters when they are missing", () => {
    expect(
      buildProductListWhere({
        category: "guitars",
        offset: 0,
      })
    ).toEqual({
      catSlug: "guitars",
      offsetPagination: { size: 20, offset: 0 },
    });
  });
});

describe("getPriceAveragePageIds", () => {
  const nodes = [
    { databaseId: 1, product_info: { priceAverage: { slug: "100-500" } } },
    { databaseId: 2, product_info: { priceAverage: { slug: "500-1000" } } },
    { databaseId: 3, product_info: { priceAverage: { slug: "100-500" } } },
  ];

  it("keeps only products in the selected price band and paginates them", () => {
    expect(getPriceAveragePageIds(nodes, "100-500", 0, 1)).toEqual({
      ids: [1, 3],
      pageIds: [1],
    });
  });
});
