import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutProductPage from "layouts/LayoutProductPage";
import { fetchQuery } from "services/graphql/fetchQuery";
import getProductBy from "services/graphql/queries/getProductBy";
import getAllProducts from "services/graphql/queries/getAllProducts";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import { QueryParameters } from "types/queryParams";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { ProductType } from "types/productType";
import { i18n } from "@/i18n";
import htmlTagCleaner from "utils/htmlTagCleaner";
import truncateMetaDescription from "utils/truncateMetaDescription";
import { buildPageMetadata } from "lib/seo/buildPageMetadata";
import { absoluteUrl } from "lib/seo/absoluteUrl";
import JsonLd from "lib/seo/JsonLd";
import { buildBreadcrumbJsonLd } from "lib/seo/jsonld/breadcrumb";
import { buildProductJsonLd } from "lib/seo/jsonld/product";
import { productDetailPath } from "lib/seo/routeSlugs";
import { productMatchesRoute } from "lib/seo/matchCmsRoute";

type PageProps = {
  params: Promise<{ category: string; subcategory: string; slug: string }>;
};

export const revalidate = 604800;
export const dynamicParams = true;

/**
 * Builds static params for popular products.
 * @return {Promise<Array<{category: string, subcategory: string, slug: string}>>} Paths.
 */
export async function generateStaticParams() {
  try {
    const getAllProductsParams: QueryParameters = { first: 20 };
    const getProducts = await fetchQuery(getAllProducts(getAllProductsParams));
    if (getProducts.notFound) return [];

    return getProducts.props.data.products.nodes.map(
      (item: {
        product_info: {
          category: { slug: string };
          subcategory: { slug: string };
        };
        slug: string;
      }) => ({
        category: item.product_info.category.slug,
        subcategory: item.product_info.subcategory.slug,
        slug: item.slug,
      })
    );
  } catch {
    return [];
  }
}

/**
 * Loads a product and ensures route params match CMS category/subcategory slugs.
 * @param {string} category Route category slug.
 * @param {string} subcategory Route subcategory slug.
 * @param {string} slug Product slug.
 * @return {Promise<ProductType | null>} Product or null when missing/mismatched.
 */
async function loadMatchingProduct(
  category: string,
  subcategory: string,
  slug: string
): Promise<ProductType | null> {
  const getProduct = await fetchQuery(getProductBy({ slug }));
  if (getProduct.notFound || !getProduct.props.data.productBy) {
    return null;
  }
  const product: ProductType = getProduct.props.data.productBy;
  if (!productMatchesRoute(product, category, subcategory, slug)) {
    return null;
  }
  return product;
}

/**
 * Builds metadata for a product detail page.
 * @param {PageProps} props Route params.
 * @return {Promise<Metadata>} Page metadata.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, subcategory, slug } = await params;
  const product = await loadMatchingProduct(category, subcategory, slug);
  if (!product) {
    return { title: slug };
  }
  const cleaned = product.product_info?.description
    ? htmlTagCleaner(product.product_info.description).trim()
    : "";
  const description = truncateMetaDescription(cleaned || product.title);
  const path = productDetailPath(
    product.product_info.category.slug,
    product.product_info.subcategory.slug,
    product.slug
  );
  return buildPageMetadata({
    title: product.title,
    description,
    path,
    image: product.product_info?.thumbnail?.sourceUrl,
  });
}

/**
 * Product detail page.
 * @param {PageProps} props Route params.
 * @return {Promise<ReactElement>} Product page.
 */
export default async function ProductSinglePage({ params }: PageProps) {
  const { category, subcategory, slug } = await params;
  const product = await loadMatchingProduct(category, subcategory, slug);
  if (!product) notFound();

  const cmsCategory = product.product_info.category.slug;
  const cmsSubcategory = product.product_info.subcategory.slug;
  const productPath = productDetailPath(
    cmsCategory,
    cmsSubcategory,
    product.slug
  );
  const productUrl = absoluteUrl(productPath);

  const getProductCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };
  const getProductCategories = await fetchQuery(
    getAllProductCategories(getProductCategoriesParams)
  );
  if (getProductCategories.notFound) notFound();

  const productsCategories: ProductsCategoriesType[] =
    getProductCategories.props.data.productCategories.nodes;

  const categoryTitle = product.product_info.category.title;
  const subcategoryTitle = product.product_info.subcategory.title;

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
            item: absoluteUrl(`/products/${cmsCategory}/`),
          },
          {
            name: subcategoryTitle,
            item: absoluteUrl(`/products/${cmsCategory}/${cmsSubcategory}/`),
          },
          { name: product.title, item: productUrl },
        ])}
      />
      <JsonLd data={buildProductJsonLd(product, productUrl)} />
      <LayoutProductPage
        productData={product}
        productsCategories={productsCategories}
      />
    </>
  );
}
