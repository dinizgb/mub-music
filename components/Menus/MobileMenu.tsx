/* eslint-disable camelcase */
import { ProductsCategoriesType } from "types/productsCategoriesType";
import Anchor from "components/Tags/Anchor";
import { cn } from "@/lib/utils";
import { i18n } from "@/i18n";
import { AnalyticsEvents } from "lib/analytics/events";

type MobileMenuProps = {
  display: string;
  productsCategories: ProductsCategoriesType[];
};

/**
 * Mobile Menu Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Mobile Menu Component.
 */
export default function MobileMenu(props: MobileMenuProps) {
  return (
    <div
      className={cn(
        `bg-background fixed top-0 left-0 z-50 flex h-full w-[270px] flex-col
        overflow-y-hidden`,
        props.display === "none" ? "hidden" : "flex"
      )}
    >
      <div
        className="h-full overflow-x-auto [&::-webkit-scrollbar]:w-[5px]
          [&::-webkit-scrollbar-thumb]:h-5
          [&::-webkit-scrollbar-thumb]:rounded-[10px]
          [&::-webkit-scrollbar-thumb]:bg-white/10"
      >
        <div className="relative">
          <div
            className="bg-primary font-heading text-all-black w-full px-[10%]
              py-4.5 pb-5 text-lg font-bold"
          >
            {i18n.nav.products}
          </div>
          <ul className="flex w-full flex-col items-stretch border-none p-0">
            {props.productsCategories.map(({ slug, title }) => {
              return (
                <li key={slug} className="contents">
                  <Anchor
                    href={`/products/${slug}`}
                    event={AnalyticsEvents.MOBILE_MENU_ITEM_CLICKED}
                    properties={{
                      section: "products",
                      label: title,
                      url: `/products/${slug}`,
                    }}
                    className="border-background-contrast text-text-3
                      hover:bg-all-black hover:text-text-4 w-full border-b-2
                      bg-black px-[10%] py-3.75 text-base font-normal
                      no-underline"
                  >
                    {title}
                  </Anchor>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative">
          <div
            className="bg-primary font-heading text-all-black w-full px-[10%]
              py-4.5 pb-5 text-lg font-bold"
          >
            {i18n.nav.news}
          </div>
          <ul className="flex w-full flex-col items-stretch border-none p-0">
            <li className="contents">
              <Anchor
                href={`/news/awards`}
                event={AnalyticsEvents.MOBILE_MENU_ITEM_CLICKED}
                properties={{
                  section: "news",
                  label: i18n.nav.awards,
                  url: "/news/awards",
                }}
                className="border-background-contrast text-text-3
                  hover:bg-all-black hover:text-text-4 w-full border-b-2
                  bg-black px-[10%] py-3.75 text-base font-normal no-underline"
              >
                {i18n.nav.awards}
              </Anchor>
            </li>
            <li className="contents">
              <Anchor
                href={`/news/music-business`}
                event={AnalyticsEvents.MOBILE_MENU_ITEM_CLICKED}
                properties={{
                  section: "news",
                  label: i18n.nav.musicBusiness,
                  url: "/news/music-business",
                }}
                className="border-background-contrast text-text-3
                  hover:bg-all-black hover:text-text-4 w-full border-b-2
                  bg-black px-[10%] py-3.75 text-base font-normal no-underline"
              >
                {i18n.nav.musicBusiness}
              </Anchor>
            </li>
            <li className="contents">
              <Anchor
                href={`/news/people`}
                event={AnalyticsEvents.MOBILE_MENU_ITEM_CLICKED}
                properties={{
                  section: "news",
                  label: i18n.nav.people,
                  url: "/news/people",
                }}
                className="border-background-contrast text-text-3
                  hover:bg-all-black hover:text-text-4 w-full border-b-2
                  bg-black px-[10%] py-3.75 text-base font-normal no-underline"
              >
                {i18n.nav.people}
              </Anchor>
            </li>
            <li className="contents">
              <Anchor
                href={`/news/releases`}
                event={AnalyticsEvents.MOBILE_MENU_ITEM_CLICKED}
                properties={{
                  section: "news",
                  label: i18n.nav.releases,
                  url: "/news/releases",
                }}
                className="border-background-contrast text-text-3
                  hover:bg-all-black hover:text-text-4 w-full border-b-2
                  bg-black px-[10%] py-3.75 text-base font-normal no-underline"
              >
                {i18n.nav.releases}
              </Anchor>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
