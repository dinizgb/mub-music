import { H2, H3, Span, P } from "components/Texts/Typographies";
import SearchInput from "components/Inputs/SearchInput";

/**
 * HomeSearch Component.
 * @return {TSX.Element}: The TSX code for the HomeSearch Component.
 */
export default function HomeSearch() {
  return (
    <div
      className="mt-5 h-[70vh] bg-[url(/images/home-art.png)]
        bg-[position:150px_50%] bg-no-repeat py-15 max-sm:mt-12.5"
    >
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-y-1 md:grid-cols-12 md:gap-x-6">
            <div className="md:col-span-7">
              <P
                className="mb-5 text-primary"
                fontWeight={600}
                fontSize={24}
                lineHeight={48}
                xsFontSize={24}
                xsLineHeight={48}
              >
                &#119062;&#119062;&#119062;&#119062;&#119062;&#119062;&#11044;&nbsp;&nbsp;Find
                your Sound &nbsp;&#119136;
              </P>
              <H2
                className="text-text-4"
                fontWeight={600}
                fontSize={42}
                lineHeight={64}
                xsFontSize={42}
                xsLineHeight={64}
              >
                Reviews, Offers, Specs and much more! Find everything you need
                about any musical product!
              </H2>
              <SearchInput
                className="mt-10"
                placeholder="Type your musical wish here :)"
              />
              <div
                className="[&_div]:border-text-1 mt-7.5 flex justify-center
                  [&_div]:border-r [&_div]:px-10 [&_div]:py-7.5
                  [&_div]:text-center [&_div:last-child]:border-r-0"
              >
                <div>
                  <H3
                    className="text-text-4"
                    fontWeight={600}
                    fontSize={21}
                    lineHeight={30}
                    xsFontSize={21}
                    xsLineHeight={30}
                  >
                    1000k+
                  </H3>
                  <Span
                    className="mb-5 text-subtitle"
                    fontWeight={600}
                    fontSize={18}
                    lineHeight={30}
                    xsFontSize={18}
                    xsLineHeight={30}
                  >
                    Products
                  </Span>
                </div>
                <div>
                  <H3
                    className="text-text-4"
                    fontWeight={600}
                    fontSize={21}
                    lineHeight={30}
                    xsFontSize={21}
                    xsLineHeight={30}
                  >
                    1000k+
                  </H3>
                  <Span
                    className="mb-5 text-subtitle"
                    fontWeight={600}
                    fontSize={18}
                    lineHeight={30}
                    xsFontSize={18}
                    xsLineHeight={30}
                  >
                    Reviews
                  </Span>
                </div>
                <div>
                  <H3
                    className="text-text-4"
                    fontWeight={600}
                    fontSize={21}
                    lineHeight={30}
                    xsFontSize={21}
                    xsLineHeight={30}
                  >
                    1000k+
                  </H3>
                  <Span
                    className="mb-5 text-subtitle"
                    fontWeight={600}
                    fontSize={18}
                    lineHeight={30}
                    xsFontSize={18}
                    xsLineHeight={30}
                  >
                    Offers
                  </Span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
