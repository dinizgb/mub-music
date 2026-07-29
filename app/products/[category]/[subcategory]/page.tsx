import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutProductsList from "layouts/LayoutProductsList";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProducts from "services/graphql/queries/getAllProducts";
import getAllProductFiltersInfos from "services/graphql/queries/getAllProductFiltersInfos";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import productFilterConstructor from "services/filters/productFilterConstructor";
import paginationOffsetFormatter from "utils/paginationOffsetFormatter";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { QueryParameters } from "types/queryParams";
import { SEOTagsConstructorTypes } from "types/SEOTagsConstructorTypes";
import { ProductType } from "types/productType";
import {
  ProductFilterType,
  ProductFilterResponseType,
} from "types/productFilterType";

type PageProps = {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ page?: string; brand?: string }>;
};

export const dynamic = "force-dynamic";

/**
 * Builds metadata for a product subcategory page.
 * @param {PageProps} props Route params.
 * @return {Promise<Metadata>} Page metadata.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  return {
    title: subcategory.toUpperCase(),
    description: `Find the best deals on ${subcategory.toUpperCase()}.`,
    alternates: {
      canonical: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/${category}/${subcategory}/`,
    },
  };
}

/**
 * Product subcategory listing page.
 * @param {PageProps} props Route params and search params.
 * @return {Promise<ReactElement>} Subcategory products page.
 */
export default async function ProductsSubCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category, subcategory } = await params;
  const query = await searchParams;
  const brand = query.brand;
  const page = query.page;
  const offset = page ? paginationOffsetFormatter(page) : 0;
  const currentPage = page ? parseInt(page, 10) : 1;

  const lastProductsDefaultParams: QueryParameters = {
    where: {
      subCatSlug: subcategory,
      offsetPagination: { size: 20, offset: offset },
    },
  };
  const lastProductsByBrandParams: QueryParameters = {
    where: {
      brandSlug: brand,
      subCatSlug: subcategory,
      offsetPagination: { size: 20, offset: offset },
    },
  };
  const lastProductsParams: QueryParameters = brand
    ? lastProductsByBrandParams
    : lastProductsDefaultParams;

  const lastProducts = await fetchQuery(getAllProducts(lastProductsParams));
  if (lastProducts.notFound) notFound();

  const lastProductsResponse: Array<ProductType> =
    lastProducts.props.data.products.nodes;
  const lastProductsTotalRecords: number =
    lastProducts.props.data.products.pageInfo.offsetPagination.total;

  const productsFiltersParams: QueryParameters = {
    where: {
      subCatSlug: subcategory,
      offsetPagination: {
        size: lastProductsTotalRecords,
        offset: 1,
      },
    },
  };
  const productsFilters = await fetchQuery(
    getAllProductFiltersInfos(productsFiltersParams)
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
  const seoData: SEOTagsConstructorTypes = {
    pageTitle: `${
      productsPrefix
        ? productsPrefix.product_info.subcategory.title
        : subcategory.toUpperCase()
    }`,
    pageExcerpt: `Find the best deals on ${
      productsPrefix
        ? productsPrefix.product_info.subcategory.title
        : subcategory.toUpperCase()
    }.`,
    pageType: "product",
    pagePath: `products/${category}/${subcategory}`,
    pageThumb: productsPrefix
      ? productsPrefix.product_info.thumbnail.sourceUrl
      : "",
    breadcrumbItemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${
          productsPrefix
            ? productsPrefix.product_info.category.title
            : category.toUpperCase()
        }`,
        item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/${category}/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${
          productsPrefix
            ? productsPrefix.product_info.subcategory.title
            : subcategory.toUpperCase()
        }`,
        item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/${category}/${subcategory}/`,
      },
    ],
  };

  return (
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
  );
}
