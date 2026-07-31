// COMPONENTS
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H2 } from "components/Texts/Typographies";
import { WhiteButton } from "components/Inputs/Buttons";
import HomeSearch from "components/Searchs/HomeSearch";
import BigHorizontalCardList from "components/Lists/BigHorizontalCardList";
import ProductCardList from "components/Lists/ProductCardList";
// TYPES
import { ProductsCategoriesType } from "types/productsCategoriesType";

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
      <Header noBg={true} productsCategories={props.productsCategories} />
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
                    className="mb-8.75 text-text-4"
                    fontWeight={600}
                    fontSize={22}
                    lineHeight={21}
                    xsFontSize={21}
                    xsLineHeight={24}
                  >
                    Featured Products
                  </H2>
                </div>
                <div>
                  <ProductCardList productList={props.productData} />
                </div>
              </div>
              <div className="md:col-span-9">
                <div className="mt-10">
                  <H2
                    className="mb-7.5 text-text-4"
                    fontWeight={600}
                    fontSize={22}
                    lineHeight={21}
                    xsFontSize={21}
                    xsLineHeight={24}
                  >
                    Latest News
                  </H2>
                  <BigHorizontalCardList postList={props.postData} />
                  <div className="flex">
                    <WhiteButton
                      className="mb-7.5"
                      href="/news/"
                      width={`100%`}
                    >
                      More news
                    </WhiteButton>
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
