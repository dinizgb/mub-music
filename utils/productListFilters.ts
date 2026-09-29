import { whereParams } from "types/whereParams";

export type ProductListFilterKey = "brand" | "priceAverage";

type BuildProductListWhereInput = {
  category: string;
  subcategory?: string;
  brand?: string;
  offset: number;
  size?: number;
};

type PriceAverageNode = {
  databaseId?: number;
  product_info?: {
    priceAverage?: {
      slug?: string;
    };
  };
};

/**
 * Adds a product list filter to the current URL and resets pagination.
 * @param {string} pathname Current pathname.
 * @param {string} currentSearch Current query string.
 * @param {ProductListFilterKey} key Filter query key.
 * @param {string} value Filter value.
 * @return {string} Path with updated query string.
 */
export function withProductListFilter(
  pathname: string,
  currentSearch: string,
  key: ProductListFilterKey,
  value: string
): string {
  const params = new URLSearchParams(currentSearch);
  params.set(key, value);
  params.delete("page");
  return `${pathname}?${params.toString()}`;
}

/**
 * Removes a product list filter from the current URL and resets pagination.
 * @param {string} pathname Current pathname.
 * @param {string} currentSearch Current query string.
 * @param {ProductListFilterKey} key Filter query key.
 * @return {string} Path with the filter removed.
 */
export function withoutProductListFilter(
  pathname: string,
  currentSearch: string,
  key: ProductListFilterKey
): string {
  const params = new URLSearchParams(currentSearch);
  params.delete(key);
  params.delete("page");
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

type ResolveProductListFilterHrefInput = {
  pathname: string;
  currentSearch: string;
  key: ProductListFilterKey;
  value: string;
  selectedValue: string | null;
};

/**
 * Sets a filter, or clears it when the selected value is clicked again.
 * @param {ResolveProductListFilterHrefInput} input Filter URL parts.
 * @return {string} Path with the filter applied or removed.
 */
export function resolveProductListFilterHref({
  pathname,
  currentSearch,
  key,
  value,
  selectedValue,
}: ResolveProductListFilterHrefInput): string {
  if (selectedValue === value) {
    return withoutProductListFilter(pathname, currentSearch, key);
  }
  return withProductListFilter(pathname, currentSearch, key, value);
}

/**
 * Builds a subcategory filter URL, or returns to the category when cleared.
 * @param {string} category Category slug.
 * @param {string} slug Clicked subcategory slug.
 * @param {string | null} selectedSlug Currently selected subcategory.
 * @param {string} currentSearch Current query string.
 * @return {string} Category or subcategory path.
 */
export function resolveSubcategoryFilterHref(
  category: string,
  slug: string,
  selectedSlug: string | null,
  currentSearch = ""
): string {
  if (selectedSlug === slug) {
    const params = new URLSearchParams(currentSearch);
    params.delete("page");
    const query = params.toString();
    return query ? `/products/${category}/?${query}` : `/products/${category}/`;
  }
  return `/products/${category}/${slug}`;
}

/**
 * Builds GraphQL where params for a product category or subcategory list.
 * @param {BuildProductListWhereInput} input Filter and pagination values.
 * @return {whereParams} Query where clause.
 */
export function buildProductListWhere(
  input: BuildProductListWhereInput
): whereParams {
  const size = input.size ?? 20;
  return {
    catSlug: input.category,
    ...(input.subcategory ? { subCatSlug: input.subcategory } : {}),
    ...(input.brand ? { brandSlug: input.brand } : {}),
    offsetPagination: { size, offset: input.offset },
  };
}

/**
 * Collects product IDs in a price-average band, then returns the current page.
 * @param {PriceAverageNode[]} nodes Products already scoped to the list.
 * @param {string} priceAverage Selected price-average slug.
 * @param {number} offset Pagination offset.
 * @param {number} size Page size.
 * @return {{ids: number[], pageIds: number[]}} Matching IDs and the page slice.
 */
export function getPriceAveragePageIds(
  nodes: PriceAverageNode[],
  priceAverage: string,
  offset: number,
  size = 20
): { ids: number[]; pageIds: number[] } {
  const ids = nodes.flatMap((node) => {
    if (node.product_info?.priceAverage?.slug !== priceAverage) {
      return [];
    }
    const id = node.databaseId ?? 0;
    return id > 0 ? [id] : [];
  });

  return {
    ids,
    pageIds: ids.slice(offset, offset + size),
  };
}
