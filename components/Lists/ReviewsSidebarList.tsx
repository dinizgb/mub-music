import Image from "next/image";
import { H2, H3, Span } from "components/Texts/Typographies";
import StarsWidget from "components/Widgets/StarsWidget";
import Anchor from "components/Tags/Anchor";
import { cn } from "@/lib/utils";
import { i18n, t } from "@/i18n";
import { AnalyticsEvents } from "lib/analytics/events";

type ReviewsSidebarListProps = {
  isPrimaryTitle: boolean;
  title: string;
  data: ReviewsSidebarListData[];
};

type ReviewsSidebarListData = {
  count: number;
  rate: number;
  store: string;
  logo: string;
  url: string;
};

/**
 * Reviews Sidebar List Component.
 * @param {ReviewsSidebarListProps} props to the component.
 * @return {TSX.Element}: The TSX code for the Reviews Sidebar List Component.
 */
export default function ReviewsSidebarList(props: ReviewsSidebarListProps) {
  return (
    <div className="bg-secondary flex w-full flex-col rounded-lg pb-2.5">
      <div
        className={cn(
          "rounded-t-lg px-5 py-2.5",
          props.isPrimaryTitle
            ? "bg-primary text-background"
            : "bg-odd-section text-text-4"
        )}
      >
        <H2
          className={cn(
            props.isPrimaryTitle ? "text-background" : "text-text-4"
          )}
          fontWeight={props.isPrimaryTitle ? 700 : 600}
          fontSize={18}
          lineHeight={36}
          xsFontSize={18}
          xsLineHeight={36}
        >
          {props.title}
        </H2>
      </div>
      <ul className="flex flex-col p-2.5 px-3.75">
        {props.data.length > 0 ? (
          props.data.map(({ count, logo, rate, store, url }) => {
            return (
              <Anchor
                href={url}
                target="_blank"
                rel="noreferrer"
                key={url}
                event={AnalyticsEvents.REVIEW_CLICKED}
                properties={{ store, rate, url }}
              >
                <li
                  className="group border-line-bottom hover:bg-primary flex
                    cursor-pointer flex-row items-center justify-between
                    border-b px-1.25 py-1.25 hover:rounded-lg [&_figure]:flex
                    [&_figure]:flex-row [&_figure]:items-center"
                >
                  <figure>
                    <div
                      className="relative mr-3 h-10 w-10 rounded-full
                        [&_img]:rounded-full"
                    >
                      <Image
                        src={logo}
                        alt={t(i18n.reviews.storeLogoAlt, { store })}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <H3
                      className="text-text-4 group-hover:text-black!"
                      fontWeight={500}
                      fontSize={16}
                      lineHeight={36}
                      xsFontSize={16}
                      xsLineHeight={36}
                    >
                      {store} {`(${count})`}
                    </H3>
                  </figure>
                  <div>
                    <StarsWidget
                      className="group-hover:text-black!"
                      fontSize={12}
                      number={rate}
                      withBackground={false}
                    />
                  </div>
                </li>
              </Anchor>
            );
          })
        ) : (
          <Span
            className="text-subtitle mt-2.5"
            fontWeight={400}
            fontSize={17}
            lineHeight={16}
            xsFontSize={17}
            xsLineHeight={16}
          >
            {i18n.reviews.empty}
          </Span>
        )}
      </ul>
    </div>
  );
}
