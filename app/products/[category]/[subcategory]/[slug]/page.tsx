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
import { i18n, t } from "@/i18n";

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
 * Builds metadata for a product detail page.
 * @param {PageProps} props Route params.
 * @return {Promise<Metadata>} Page metadata.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, subcategory, slug } = await params;
  const getProduct = await fetchQuery(getProductBy({ slug }));
  if (getProduct.notFound) {
    return { title: slug };
  }
  const product: ProductType = getProduct.props.data.productBy;
  return {
    title: product.title,
    description: product.title,
    alternates: {
      canonical: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/${category}/${subcategory}/${slug}/`,
    },
    openGraph: {
      type: "website",
      title: t(i18n.meta.titleSuffix, { title: product.title }),
      images: [product.product_info?.thumbnail?.sourceUrl].filter(Boolean),
    },
  };
}

/**
 * Product detail page.
 * @param {PageProps} props Route params.
 * @return {Promise<ReactElement>} Product page.
 */
export default async function ProductSinglePage({ params }: PageProps) {
  const { slug } = await params;
  const getProduct = await fetchQuery(getProductBy({ slug }));
  if (getProduct.notFound || !getProduct.props.data.productBy) notFound();

  const getProductCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };
  const getProductCategories = await fetchQuery(
    getAllProductCategories(getProductCategoriesParams)
  );
  if (getProductCategories.notFound) notFound();

  const productsCategories: ProductsCategoriesType[] =
    getProductCategories.props.data.productCategories.nodes;

  return (
    <LayoutProductPage
      productData={getProduct.props.data.productBy}
      productsCategories={productsCategories}
    />
  );
}
