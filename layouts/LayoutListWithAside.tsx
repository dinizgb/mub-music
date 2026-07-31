// COMPONENTS
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H2, P } from "components/Texts/Typographies";
import BigHorizontalCardList from "components/Lists/BigHorizontalCardList";
// TYPES
import { ProductsCategoriesType } from "types/productsCategoriesType";

type LayoutListWithAsideProps = {
  postData: any;
  TopFiveWidgetData: any;
  TopFiveWidgetTitle: string;
  layoutSection: string;
  layoutTitle: string;
  layoutSlug: string;
  layoutDescription: string;
  productsCategories: ProductsCategoriesType[];
};

/**
 * List with Aside Layout Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the List with Aside Layout Component.
 */
export default function LayoutListWithAside(props: LayoutListWithAsideProps) {
  const postList = props.postData;

  return (
    <>
      <Header productsCategories={props.productsCategories} />
      <main>
        <div className="mx-auto w-full max-w-screen-2xl px-4">
          <div className="w-full">
            <div
              className="mt-12.5 grid w-full grid-cols-1 gap-x-2 sm:gap-x-4
                md:grid-cols-12 md:gap-x-6"
            >
              <div className="md:col-span-9">
                <H2
                  fontType={"MainTitle"}
                  className="text-text-4"
                  fontWeight={400}
                  fontSize={76}
                  lineHeight={100}
                  xsFontSize={60}
                  xsLineHeight={70}
                >
                  {props.layoutTitle}
                </H2>
                <P
                  className="my-7.5 text-text-4"
                  fontWeight={300}
                  fontSize={24}
                  lineHeight={40}
                  xsFontSize={21}
                  xsLineHeight={36}
                >
                  {props.layoutDescription}
                </P>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div
              className="grid w-full grid-cols-1 gap-x-2 sm:gap-x-6
                md:grid-cols-12 md:gap-x-10"
            >
              <div className="md:col-span-8">
                <div className="mt-10.25">
                  {postList.length == 0 ? (
                    `No data available`
                  ) : (
                    <BigHorizontalCardList
                      postList={postList}
                      layoutSection={props.layoutSection}
                    />
                  )}
                </div>
              </div>
              <div className="md:col-span-4">No data available for now</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
