import LayoutPrivacyPolicyPage from "layouts/LayoutPrivacyPolicyPage";
import { fetchQuery } from "services/graphql/fetchQuery";
import getAllProductCategories from "services/graphql/queries/getAllProductCategories";
import { QueryParameters } from "types/queryParams";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { i18n } from "@/i18n";
import { buildPageMetadata } from "lib/seo/buildPageMetadata";
import { notFound } from "next/navigation";

export const metadata = buildPageMetadata({
  title: i18n.privacyPolicy.title,
  description: i18n.privacyPolicy.metaDescription,
  path: "/privacy-policy",
});

/**
 * Privacy Policy page.
 * @return {Promise<ReactElement>} Privacy policy page.
 */
export default async function PrivacyPolicyPage() {
  const getProductCategoriesParams: QueryParameters = {
    where: { offsetPagination: { size: 100, offset: 1 } },
  };
  const getProductCategories = await fetchQuery(
    getAllProductCategories(getProductCategoriesParams)
  );
  if (getProductCategories.notFound) notFound();

  const productCategories: ProductsCategoriesType[] =
    getProductCategories.props.data.productCategories.nodes;

  return <LayoutPrivacyPolicyPage productsCategories={productCategories} />;
}
