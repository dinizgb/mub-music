import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProductFiltersInfos from "services/graphql/queries/getAllProductFiltersInfos";
import getAllProducts from "services/graphql/queries/getAllProducts";
import { ProductFilterResponseType } from "types/productFilterType";
import { ProductType } from "types/productType";
import { orderItemsByIds } from "utils/parseProductIds";
import {
  buildProductListWhere,
  getPriceAveragePageIds,
} from "utils/productListFilters";

const PAGE_SIZE = 20;

type LoadProductListPageInput = {
  category: string;
  subcategory?: string;
  brand?: string;
  priceAverage?: string;
  offset: number;
};

export type ProductListPageData = {
  products: ProductType[];
  totalCount: number;
  filterNodes: ProductFilterResponseType[];
};

/**
 * Loads a category or subcategory product list, applying price average locally.
 * @param {LoadProductListPageInput} input Route and filter values.
 * @return {Promise<ProductListPageData | { notFound: true }>} List data.
 */
export async function loadProductListPage(
  input: LoadProductListPageInput
): Promise<ProductListPageData | { notFound: true }> {
  if (input.priceAverage) {
    const scopedCount = await fetchQuery(
      getAllProducts({
        where: buildProductListWhere({
          category: input.category,
          subcategory: input.subcategory,
          brand: input.brand,
          offset: 0,
          size: 1,
        }),
      })
    );
    if (scopedCount.notFound) {
      return { notFound: true };
    }

    const scopedTotal =
      scopedCount.props.data.products.pageInfo.offsetPagination.total;
    const productsFilters = await fetchQuery(
      getAllProductFiltersInfos({
        where: buildProductListWhere({
          category: input.category,
          subcategory: input.subcategory,
          brand: input.brand,
          offset: 0,
          size: scopedTotal,
        }),
      })
    );
    if (productsFilters.notFound) {
      return { notFound: true };
    }

    const filterNodes: ProductFilterResponseType[] =
      productsFilters.props.data.products.nodes;
    const { ids, pageIds } = getPriceAveragePageIds(
      filterNodes,
      input.priceAverage,
      input.offset,
      PAGE_SIZE
    );

    if (pageIds.length === 0) {
      return { products: [], totalCount: ids.length, filterNodes };
    }

    const lastProducts = await fetchQuery(
      getAllProducts({
        first: pageIds.length,
        where: { in: pageIds },
      })
    );
    if (lastProducts.notFound) {
      return { products: [], totalCount: ids.length, filterNodes };
    }

    return {
      products: orderItemsByIds(
        lastProducts.props.data.products.nodes,
        pageIds,
        (product) => product.databaseId ?? 0
      ),
      totalCount: ids.length,
      filterNodes,
    };
  }

  const lastProducts = await fetchQuery(
    getAllProducts({
      where: buildProductListWhere({
        category: input.category,
        subcategory: input.subcategory,
        brand: input.brand,
        offset: input.offset,
        size: PAGE_SIZE,
      }),
    })
  );
  if (lastProducts.notFound) {
    return { notFound: true };
  }

  const totalCount =
    lastProducts.props.data.products.pageInfo.offsetPagination.total;
  const productsFilters = await fetchQuery(
    getAllProductFiltersInfos({
      where: buildProductListWhere({
        category: input.category,
        subcategory: input.subcategory,
        brand: input.brand,
        offset: 0,
        size: totalCount,
      }),
    })
  );
  if (productsFilters.notFound) {
    return { notFound: true };
  }

  return {
    products: lastProducts.props.data.products.nodes,
    totalCount,
    filterNodes: productsFilters.props.data.products.nodes,
  };
}
