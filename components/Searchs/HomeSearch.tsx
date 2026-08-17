import { H1, Span, P } from "components/Texts/Typographies";
import SearchInput from "components/Inputs/SearchInput";
import { i18n } from "@/i18n";

/**
 * HomeSearch Component.
 * @return {TSX.Element}: The TSX code for the HomeSearch Component.
 */
export default function HomeSearch() {
  return (
    <div
      className="mt-5 h-[70vh] bg-[url(/images/home-art.png)]
        bg-position-[150px_50%] bg-no-repeat py-15 max-sm:mt-12.5"
    >
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-y-1 md:grid-cols-12 md:gap-x-6">
            <div className="md:col-span-7">
              <P
                className="text-primary mb-5"
                fontWeight={600}
                fontSize={24}
                lineHeight={48}
                xsFontSize={24}
                xsLineHeight={48}
              >
                &#119062;&#119062;&#119062;&#119062;&#119062;&#119062;&#11044;&nbsp;&nbsp;
                {i18n.home.findYourSound} &nbsp;&#119136;
              </P>
              <H1
                className="text-text-4"
                fontWeight={600}
                fontSize={42}
                lineHeight={64}
                xsFontSize={42}
                xsLineHeight={64}
              >
                {i18n.home.headline}
              </H1>
              <SearchInput
                className="mt-10"
                placeholder={i18n.home.searchPlaceholder}
              />
              <div
                className="[&_div]:border-text-1 mt-7.5 flex justify-center
                  [&_div]:border-r [&_div]:px-10 [&_div]:py-7.5
                  [&_div]:text-center [&_div:last-child]:border-r-0"
              >
                <div>
                  <P
                    className="text-text-4"
                    fontWeight={600}
                    fontSize={21}
                    lineHeight={30}
                    xsFontSize={21}
                    xsLineHeight={30}
                  >
                    {i18n.home.statsValue}
                  </P>
                  <Span
                    className="text-subtitle mb-5"
                    fontWeight={600}
                    fontSize={18}
                    lineHeight={30}
                    xsFontSize={18}
                    xsLineHeight={30}
                  >
                    {i18n.home.statsProducts}
                  </Span>
                </div>
                <div>
                  <P
                    className="text-text-4"
                    fontWeight={600}
                    fontSize={21}
                    lineHeight={30}
                    xsFontSize={21}
                    xsLineHeight={30}
                  >
                    {i18n.home.statsValue}
                  </P>
                  <Span
                    className="text-subtitle mb-5"
                    fontWeight={600}
                    fontSize={18}
                    lineHeight={30}
                    xsFontSize={18}
                    xsLineHeight={30}
                  >
                    {i18n.home.statsReviews}
                  </Span>
                </div>
                <div>
                  <P
                    className="text-text-4"
                    fontWeight={600}
                    fontSize={21}
                    lineHeight={30}
                    xsFontSize={21}
                    xsLineHeight={30}
                  >
                    {i18n.home.statsValue}
                  </P>
                  <Span
                    className="text-subtitle mb-5"
                    fontWeight={600}
                    fontSize={18}
                    lineHeight={30}
                    xsFontSize={18}
                    xsLineHeight={30}
                  >
                    {i18n.home.statsOffers}
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
