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
      className="relative z-20 mt-5 min-h-0 bg-[url(/images/home-art.png)]
        bg-position-[150px_50%] bg-no-repeat py-15 max-sm:mt-2 max-sm:py-4
        md:min-h-[70vh]"
    >
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-y-1 md:grid-cols-12 md:gap-x-6">
            <div className="max-w-full min-w-0 md:col-span-7">
              <P
                className="text-primary mb-5 max-sm:mb-2"
                fontWeight={600}
                fontSize={24}
                lineHeight={48}
                xsFontSize={24}
                xsLineHeight={32}
              >
                {i18n.home.findYourSound}
              </P>
              <H1
                className="text-text-4 max-sm:break-words"
                fontWeight={600}
                fontSize={42}
                lineHeight={64}
                xsFontSize={36}
                xsLineHeight={48}
              >
                {i18n.home.headline}
              </H1>
              <SearchInput
                className="mt-10 max-sm:mt-6"
                placeholder={i18n.home.searchPlaceholder}
              />
              <div
                className="[&_div]:border-text-1 mt-7.5 flex w-full min-w-0
                  justify-center [&_div]:min-w-0 [&_div]:flex-1 [&_div]:border-r
                  [&_div]:px-10 [&_div]:py-7.5 [&_div]:text-center
                  max-sm:[&_div]:px-2 max-sm:[&_div]:py-4
                  [&_div:last-child]:border-r-0"
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
