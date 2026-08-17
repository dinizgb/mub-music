import Image from "next/image";
import { H2, H3, Span } from "components/Texts/Typographies";
import { cn } from "@/lib/utils";
import { i18n, t } from "@/i18n";

type OffersSidebarListProps = {
  isPrimaryTitle: boolean;
  title: string;
  data: OffersSidebarListData[];
};

type OffersSidebarListData = {
  logo: string;
  price: number;
  store: string;
  url: string;
};

/**
 * Offers Sidebar List Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Offers Sidebar List Component.
 */
export default function OffersSidebarList(props: OffersSidebarListProps) {
  return (
    <div
      className="bg-secondary mb-5 flex w-full flex-col rounded-lg pb-2.5
        md:mb-7.5"
    >
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
        {props.data ? (
          props.data.map(({ logo, price, store, url }) => {
            return (
              <a href={url} target="_blank" rel="noreferrer" key={url}>
                <li
                  className="group border-line-bottom hover:bg-primary flex
                    cursor-pointer flex-row items-center justify-between
                    border-b px-1.25 py-1.25 hover:rounded-lg [&_div]:flex
                    [&_div]:flex-col [&_figure]:flex [&_figure]:flex-row
                    [&_figure]:items-center"
                >
                  <figure>
                    <div
                      className="relative mr-3 h-10 w-10 rounded-full
                        [&_img]:rounded-full"
                    >
                      <Image
                        src={logo}
                        alt={t(i18n.offers.storeLogoAlt, { store })}
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
                      {store}
                    </H3>
                  </figure>
                  <div>
                    <Span
                      className="text-subtitle mb-1.5 group-hover:text-black!"
                      fontWeight={400}
                      fontSize={14}
                      lineHeight={16}
                      xsFontSize={14}
                      xsLineHeight={16}
                    >
                      {i18n.offers.from}
                    </Span>
                    <Span
                      className="text-text-4 group-hover:text-black!"
                      fontWeight={700}
                      fontSize={18}
                      lineHeight={18}
                      xsFontSize={18}
                      xsLineHeight={18}
                    >
                      ${price}
                    </Span>
                  </div>
                </li>
              </a>
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
            {i18n.offers.empty}
          </Span>
        )}
      </ul>
    </div>
  );
}
