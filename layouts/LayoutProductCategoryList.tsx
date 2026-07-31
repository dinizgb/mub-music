/* eslint-disable camelcase */
/* eslint-disable new-cap */
// COMPONENTS
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H2, P } from "components/Texts/Typographies";
import BackgroundCard from "components/Cards/BackgroundCard";
// TYPES
import { SEOTagsConstructorTypes } from "types/SEOTagsConstructorTypes";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { i18n, t } from "@/i18n";

type LayoutProductCategoryListProps = {
  lastProductsCategories: ProductsCategoriesType[];
  seoData: SEOTagsConstructorTypes;
  totalCount: number;
};

/**
 * Footer Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Footer Component.
 */
export default function LayoutProductCategoryList(
  props: LayoutProductCategoryListProps
) {
  return (
    <>
      <Header productsCategories={props.lastProductsCategories} />
      <main>
        <div
          className="mt-2.5 mb-17.5 w-full [&_img]:inline-block [&_img]:w-full"
        >
          <div className="mx-auto w-full max-w-[1200px] px-4">
            <div className="mb-4 w-full">
              <div
                className="grid w-full grid-cols-12 gap-x-2 sm:gap-x-6
                  md:gap-x-10"
              >
                <div className="col-span-8 mt-10 sm:col-span-6 md:col-span-8">
                  <H2
                    className="text-text-4"
                    fontWeight={600}
                    fontSize={26}
                    lineHeight={30}
                    xsFontSize={26}
                    xsLineHeight={30}
                  >
                    {i18n.products.title}
                  </H2>
                  <P
                    className="text-subtitle mt-1.25 mb-2.5"
                    fontWeight={400}
                    fontSize={16}
                    lineHeight={40}
                    xsFontSize={16}
                    xsLineHeight={36}
                  >
                    {i18n.products.subtitle}
                  </P>
                </div>
                <div className="col-span-4 sm:col-span-6 md:col-span-4">
                  <div
                    className="mt-18.75 text-right max-sm:mt-0 max-sm:mb-5
                      max-sm:text-left"
                  >
                    <P
                      className="text-subtitle mb-3.75"
                      fontWeight={600}
                      fontSize={15}
                      lineHeight={36}
                      xsFontSize={16}
                      xsLineHeight={36}
                    >
                      {t(i18n.products.itemsFound, {
                        count: props.totalCount,
                      })}
                    </P>
                  </div>
                </div>
              </div>
              <div
                className="grid w-full grid-cols-1 gap-x-2 sm:grid-cols-12
                  sm:gap-x-6 md:gap-x-10"
              >
                {props.lastProductsCategories.map(
                  ({ product_category_info, slug, title }) => {
                    return (
                      <div
                        className="mt-8.75 sm:col-span-4 md:col-span-3"
                        key={slug}
                      >
                        <BackgroundCard
                          backgroundCardThumbnail={
                            product_category_info.thumbnail.sourceUrl
                          }
                          backgroundCardUrl={`${slug}`}
                          backgroundCardTitle={title}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
