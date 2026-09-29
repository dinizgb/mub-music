import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutProductsList from "layouts/LayoutProductsList";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProducts from "services/graphql/queries/getAllProducts";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import productFilterConstructor from "services/filters/productFilterConstructor";
import { loadProductListPage } from "services/filters/loadProductListPage";
import paginationOffsetFormatter from "utils/paginationOffsetFormatter";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { QueryParameters } from "types/queryParams";
import { PageSeoCopy } from "types/pageSeoCopy";
import { ProductType } from "types/productType";
import {
  ProductFilterType,
  ProductFilterResponseType,
} from "types/productFilterType";
import { i18n, t } from "@/i18n";
import { buildPageMetadata } from "lib/seo/buildPageMetadata";
import { absoluteUrl } from "lib/seo/absoluteUrl";
import JsonLd from "lib/seo/JsonLd";
import { buildBreadcrumbJsonLd } from "lib/seo/jsonld/breadcrumb";

type PageProps = {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{
    page?: string;
    brand?: string;
    priceAverage?: string;
  }>;
};

export const dynamic = "force-dynamic";

/**
 * Resolves category and subcategory display names.
 * @param {string} category Category slug.
 * @param {string} subcategory Subcategory slug.
 * @return {Promise<{categoryTitle: string, subcategoryTitle: string}>} Titles.
 */
async function resolveTitles(category: string, subcategory: string) {
  const products = await fetchQuery(
    getAllProducts({
      where: {
        catSlug: category,
        subCatSlug: subcategory,
        offsetPagination: { size: 1, offset: 0 },
      },
    })
  );
  if (!products.notFound && products.props.data.products.nodes[0]) {
    const info = products.props.data.products.nodes[0].product_info;
    return {
      categoryTitle: info.category.title,
      subcategoryTitle: info.subcategory.title,
    };
  }
  return {
    categoryTitle: category,
    subcategoryTitle: subcategory,
  };
}

/**
 * Builds metadata for a product subcategory page.
 * @param {PageProps} props Route params.
 * @return {Promise<Metadata>} Page metadata.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const { subcategoryTitle } = await resolveTitles(category, subcategory);
  return buildPageMetadata({
    title: subcategoryTitle,
    description: t(i18n.products.categoryDescription, {
      name: subcategoryTitle,
    }),
    path: `/products/${category}/${subcategory}/`,
  });
}

/**
 * Product subcategory listing page.
 * @param {PageProps} props Route params and search params.
 * @return {Promise<ReactElement>} Subcategory products page.
 */
export default async function ProductsSubcategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category, subcategory } = await params;
  const query = await searchParams;
  const offset = query.page ? paginationOffsetFormatter(query.page) : 0;
  const currentPage = query.page ? parseInt(query.page, 10) : 1;

  const productList = await loadProductListPage({
    category,
    subcategory,
    brand: query.brand,
    priceAverage: query.priceAverage,
    offset,
  });
  if ("notFound" in productList) notFound();

  const lastProductsResponse: ProductType[] = productList.products;
  const lastProductsTotalRecords: number = productList.totalCount;
  const productsFiltersResponse: Array<ProductFilterResponseType> =
    productList.filterNodes;

  const getProductCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };
  const getProductCategories = await fetchQuery(
    getAllProductCategories(getProductCategoriesParams)
  );
  if (getProductCategories.notFound) notFound();

  const getProductCategoriesResponse: ProductsCategoriesType[] =
    getProductCategories.props.data.productCategories.nodes;

  const productSubCategoryCategories = productFilterConstructor(
    productsFiltersResponse,
    "subcategory"
  );
  const brands: Array<ProductFilterType> = productFilterConstructor(
    productsFiltersResponse,
    "brand"
  );
  const priceAverage: Array<ProductFilterType> = productFilterConstructor(
    productsFiltersResponse,
    "priceAverage"
  );

  const productsPrefix = lastProductsResponse[0];
  const resolvedTitles = await resolveTitles(category, subcategory);
  const categoryTitle =
    productsPrefix?.product_info.category.title ?? resolvedTitles.categoryTitle;
  const subcategoryTitle =
    productsPrefix?.product_info.subcategory.title ??
    resolvedTitles.subcategoryTitle;
  const seoData: PageSeoCopy = {
    pageTitle: subcategoryTitle,
    pageExcerpt: t(i18n.products.categoryDescription, {
      name: subcategoryTitle,
    }),
  };

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: i18n.products.breadcrumbHome, item: absoluteUrl("/") },
          {
            name: i18n.products.breadcrumbProducts,
            item: absoluteUrl("/products/"),
          },
          {
            name: categoryTitle,
            item: absoluteUrl(`/products/${category}/`),
          },
          {
            name: subcategoryTitle,
            item: absoluteUrl(`/products/${category}/${subcategory}/`),
          },
        ])}
      />
      <Suspense fallback={null}>
        <LayoutProductsList
          productData={lastProductsResponse}
          productCategoryData={category}
          productsCategories={getProductCategoriesResponse}
          productSubCategories={productSubCategoryCategories}
          productSubCategoryData={subcategory}
          productBrandsData={brands}
          productPriceAverageData={priceAverage}
          seoData={seoData}
          totalCount={lastProductsTotalRecords}
          currentPage={currentPage}
        />
      </Suspense>
    </>
  );
}
