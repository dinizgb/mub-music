// COMPONENTS
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H2 } from "components/Texts/Typographies";
import HomeSearch from "components/Searches/HomeSearch";
import BigHorizontalCardList from "components/Lists/BigHorizontalCardList";
import ProductCardList from "components/Lists/ProductCardList";
import Anchor from "components/Tags/Anchor";
// TYPES
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { i18n } from "@/i18n";
import { AnalyticsEvents } from "lib/analytics/events";

type LayoutHomePageProps = {
  postData: any;
  productData: any;
  productsCategories: ProductsCategoriesType[];
  layoutDescription: string;
};

/**
 * Home Page Layout Component.
 * @param {LayoutHomePageProps} props to the component.
 * @return {TSX.Element}: The TSX code for the Home Page Layout Component.
 */
export default function LayoutHomePage(props: LayoutHomePageProps) {
  return (
    <>
      <Header
        noBg={true}
        noSearch={true}
        productsCategories={props.productsCategories}
      />
      <HomeSearch />
      <main>
        <div className="mx-auto w-full max-w-screen-2xl px-4">
          <div className="bg-background relative z-0 w-full">
            <div
              className="mt-20 grid w-full grid-cols-1 gap-x-2 sm:gap-x-6
                md:grid-cols-12 md:gap-x-10"
            >
              <div className="md:col-span-9">
                <div className="mt-10">
                  <H2
                    className="text-text-4 mb-8.75"
                    fontWeight={600}
                    fontSize={22}
                    lineHeight={21}
                    xsFontSize={21}
                    xsLineHeight={24}
                  >
                    {i18n.home.featuredProducts}
                  </H2>
                </div>
                <div>
                  <ProductCardList productList={props.productData} />
                </div>
              </div>
              <div className="md:col-span-9">
                <div className="mt-10">
                  <H2
                    className="text-text-4 mb-7.5"
                    fontWeight={600}
                    fontSize={22}
                    lineHeight={21}
                    xsFontSize={21}
                    xsLineHeight={24}
                  >
                    {i18n.home.latestNews}
                  </H2>
                  <BigHorizontalCardList postList={props.postData} />
                  <div className="flex">
                    <Anchor
                      className="border-text-4 text-text-4 hover:bg-text-4
                        hover:text-text-1 mb-7.5 border-[3px] py-3.75
                        text-center text-[21px] font-semibold transition-colors"
                      style={{ width: "100%" }}
                      href="/news/"
                      event={AnalyticsEvents.MORE_NEWS_CLICKED}
                      properties={{ url: "/news/" }}
                    >
                      {i18n.home.moreNews}
                    </Anchor>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
