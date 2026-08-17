import { notFound } from "next/navigation";
import LayoutProductCategoryList from "layouts/LayoutProductCategoryList";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import { QueryParameters } from "types/queryParams";
import { PageSeoCopy } from "types/pageSeoCopy";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { i18n } from "@/i18n";
import { buildPageMetadata } from "lib/seo/buildPageMetadata";
import JsonLd from "lib/seo/JsonLd";
import { buildBreadcrumbJsonLd } from "lib/seo/jsonld/breadcrumb";
import { absoluteUrl } from "lib/seo/absoluteUrl";

export const metadata = buildPageMetadata({
  title: i18n.products.title,
  description: i18n.products.description,
  path: "/products/",
});

/**
 * Products index page.
 * @return {Promise<ReactElement>} Products home page.
 */
export default async function ProductsHomePage() {
  const lastProductsCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };
  const lastProducts = await fetchQuery(
    getAllProductCategories(lastProductsCategoriesParams)
  );
  if (lastProducts.notFound) notFound();

  const lastProductsCategoriesResponse: ProductsCategoriesType[] =
    lastProducts.props.data.productCategories.nodes;
  const lastProductsCategoriesTotalRecords: number =
    lastProducts.props.data.productCategories.pageInfo.offsetPagination.total;

  const seoData: PageSeoCopy = {
    pageTitle: i18n.products.title,
    pageExcerpt: i18n.products.description,
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
        ])}
      />
      <LayoutProductCategoryList
        lastProductsCategories={lastProductsCategoriesResponse}
        seoData={seoData}
        totalCount={lastProductsCategoriesTotalRecords}
      />
    </>
  );
}
