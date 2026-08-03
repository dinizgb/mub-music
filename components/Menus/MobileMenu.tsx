/* eslint-disable camelcase */
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { cn } from "@/lib/utils";
import { i18n } from "@/i18n";

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
        `bg-background fixed top-0 left-0 z-26 h-full w-[270px] flex-col
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
            className="bg-secondary font-heading text-text-4 w-4/5 px-[10%]
              py-4.5 pb-5 text-lg font-bold"
          >
            {i18n.nav.products}
          </div>
          <ul className="flex flex-col items-start border-none p-0">
            {props.productsCategories.map(({ slug, title }) => {
              return (
                <li key={slug} className="contents">
                  <a
                    href={`/products/${slug}`}
                    className="border-background-contrast text-text-3
                      hover:bg-all-black hover:text-text-4 w-4/5 border-b-2
                      bg-black px-[10%] py-3.75 text-base font-normal
                      no-underline"
                  >
                    {title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative">
          <div
            className="bg-secondary font-heading text-text-4 w-4/5 px-[10%]
              py-4.5 pb-5 text-lg font-bold"
          >
            {i18n.nav.news}
          </div>
          <ul className="flex flex-col items-start border-none p-0">
            <li className="contents">
              <a
                href={`/news/awards`}
                className="border-background-contrast text-text-3
                  hover:bg-all-black hover:text-text-4 w-4/5 border-b-2 bg-black
                  px-[10%] py-3.75 text-base font-normal no-underline"
              >
                {i18n.nav.awards}
              </a>
            </li>
            <li className="contents">
              <a
                href={`/news/music-business`}
                className="border-background-contrast text-text-3
                  hover:bg-all-black hover:text-text-4 w-4/5 border-b-2 bg-black
                  px-[10%] py-3.75 text-base font-normal no-underline"
              >
                {i18n.nav.musicBusiness}
              </a>
            </li>
            <li className="contents">
              <a
                href={`/news/people`}
                className="border-background-contrast text-text-3
                  hover:bg-all-black hover:text-text-4 w-4/5 border-b-2 bg-black
                  px-[10%] py-3.75 text-base font-normal no-underline"
              >
                {i18n.nav.people}
              </a>
            </li>
            <li className="contents">
              <a
                href={`/news/releases`}
                className="border-background-contrast text-text-3
                  hover:bg-all-black hover:text-text-4 w-4/5 border-b-2 bg-black
                  px-[10%] py-3.75 text-base font-normal no-underline"
              >
                {i18n.nav.releases}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
