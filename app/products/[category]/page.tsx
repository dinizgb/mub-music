import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutProductsList from "layouts/LayoutProductsList";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProducts from "services/graphql/queries/getAllProducts";
import getAllProductFiltersInfos from "services/graphql/queries/getAllProductFiltersInfos";
import productFilterConstructor from "services/filters/productFilterConstructor";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import getProductCategoryBy from "services/graphql/queries/getProductCategoryBy";
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
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; brand?: string }>;
};

export const dynamic = "force-dynamic";

/**
 * Resolves a human category title from CMS when possible.
 * @param {string} category Category slug.
 * @return {Promise<string>} Display name.
 */
async function resolveCategoryTitle(category: string): Promise<string> {
  const categoryReq = await fetchQuery(
    getProductCategoryBy({ slug: category })
  );
  if (
    !categoryReq.notFound &&
    categoryReq.props.data.productCategoryBy?.title
  ) {
    return categoryReq.props.data.productCategoryBy.title;
  }
  const products = await fetchQuery(
    getAllProducts({
      where: {
        catSlug: category,
        offsetPagination: { size: 1, offset: 0 },
      },
    })
  );
  if (!products.notFound && products.props.data.products.nodes[0]) {
    return products.props.data.products.nodes[0].product_info.category.title;
  }
  return category;
}

/**
 * Builds metadata for a product category page.
 * @param {PageProps} props Route params and search params.
 * @return {Promise<Metadata>} Page metadata.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const name = await resolveCategoryTitle(category);
  return buildPageMetadata({
    title: name,
    description: t(i18n.products.categoryDescription, { name }),
    path: `/products/${category}/`,
  });
}

/**
 * Product category listing page.
 * @param {PageProps} props Route params and search params.
 * @return {Promise<ReactElement>} Category products page.
 */
export default async function ProductsCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params;
  const query = await searchParams;
  const offset = query.page ? paginationOffsetFormatter(query.page) : 0;
  const currentPage = query.page ? parseInt(query.page, 10) : 1;

  const lastProductsDefaultParams: QueryParameters = {
    where: {
      catSlug: category,
      offsetPagination: { size: 20, offset: offset },
    },
  };
  const lastProductsByBrandParams: QueryParameters = {
    where: {
      brandSlug: query.brand,
      catSlug: category,
      offsetPagination: { size: 20, offset: offset },
    },
  };
  const lastProductsParams: QueryParameters = query.brand
    ? lastProductsByBrandParams
    : lastProductsDefaultParams;

  const lastProducts = await fetchQuery(getAllProducts(lastProductsParams));
  if (lastProducts.notFound) notFound();

  const lastProductsResponse: ProductType[] =
    lastProducts.props.data.products.nodes;
  const lastProductsTotalRecords: number =
    lastProducts.props.data.products.pageInfo.offsetPagination.total;

  const productsFilters = await fetchQuery(
    getAllProductFiltersInfos({
      where: {
        catSlug: category,
        offsetPagination: { size: lastProductsTotalRecords, offset: 0 },
      },
    })
  );
  if (productsFilters.notFound) notFound();

  const productsFiltersResponse: Array<ProductFilterResponseType> =
    productsFilters.props.data.products.nodes;

  const getProductCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };
  const getProductCategories = await fetchQuery(
    getAllProductCategories(getProductCategoriesParams)
  );
  if (getProductCategories.notFound) notFound();

  const getProductCategoriesResponse: ProductsCategoriesType[] =
    getProductCategories.props.data.productCategories.nodes;

  const productSubCategoryCategories: Array<ProductFilterType> =
    productFilterConstructor(productsFiltersResponse, "subcategory");
  const brands: Array<ProductFilterType> = productFilterConstructor(
    productsFiltersResponse,
    "brand"
  );
  const priceAverage: Array<ProductFilterType> = productFilterConstructor(
    productsFiltersResponse,
    "priceAverage"
  );

  const productsPrefix = lastProductsResponse[0];
  const categoryTitle =
    productsPrefix?.product_info.category.title ??
    (await resolveCategoryTitle(category));
  const seoData: PageSeoCopy = {
    pageTitle: categoryTitle,
    pageExcerpt: t(i18n.products.categoryDescription, {
      name: categoryTitle,
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
        ])}
      />
      <Suspense fallback={null}>
        <LayoutProductsList
          productData={lastProductsResponse}
          productCategoryData={category}
          productsCategories={getProductCategoriesResponse}
          productSubCategories={productSubCategoryCategories}
          productSubCategoryData={null}
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
