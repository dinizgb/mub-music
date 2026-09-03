"use client";

import { Menu } from "lucide-react";
import MobileMenu from "../Menus/MobileMenu";
import SearchInput from "components/Inputs/SearchInput";
import Anchor from "components/Tags/Anchor";
import { useAppSelector, useAppDispatch } from "redux/store";
import { toggleMobileMenu } from "redux/slices/mobileMenu/";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { cn } from "@/lib/utils";
import { i18n } from "@/i18n";
import { AnalyticsEvents } from "lib/analytics/events";
import { trackEvent } from "lib/analytics/track";

type NavProps = {
  productsCategories: ProductsCategoriesType[];
  noSearch?: boolean;
};

/**
 * Nav Component.
 * @param {NavProps} props to the component.
 * @return {TSX.Element}: The TSX code for the Nav Component.
 */
export default function Nav(props: NavProps) {
  const dispatch = useAppDispatch();
  const mobileMenuStatus = useAppSelector(
    (state) => state.mobileMenuEvents.showMobileMenu
  );
  const handleToggleMobileMenu = () => {
    const nextOpen = !mobileMenuStatus;
    trackEvent(AnalyticsEvents.MOBILE_MENU_CLICKED, {
      action: nextOpen ? "open" : "close",
    });
    dispatch(toggleMobileMenu(nextOpen));
  };

  return (
    <nav className="w-full">
      <ul
        className={cn(
          "flex w-full flex-row items-center gap-6.25 p-0",
          props.noSearch ? "justify-end" : "min-[886px]:justify-end"
        )}
      >
        {!props.noSearch ? (
          <li
            className="relative min-w-0 flex-1 min-[886px]:max-w-[250px]
              min-[886px]:transition-[max-width] min-[886px]:duration-300
              min-[886px]:ease-in-out min-[886px]:focus-within:max-w-full"
          >
            <SearchInput compact placeholder={i18n.header.search} />
          </li>
        ) : null}
        <li className="hidden min-[886px]:flex">
          <Anchor
            href="/news/"
            className="font-heading hover:text-primary-hover font-medium
              tracking-[0.5px] text-white no-underline"
            event={AnalyticsEvents.HEADER_NAV_CLICKED}
            properties={{ label: i18n.header.news, url: "/news/" }}
          >
            {i18n.header.news}
          </Anchor>
        </li>
        <li className="hidden min-[886px]:flex">
          <Anchor
            href="/products/"
            className="font-heading hover:text-primary-hover font-medium
              tracking-[0.5px] text-white no-underline"
            event={AnalyticsEvents.HEADER_NAV_CLICKED}
            properties={{ label: i18n.header.products, url: "/products/" }}
          >
            {i18n.header.products}
          </Anchor>
        </li>
        <li
          className="hover:text-primary-hover shrink-0 cursor-pointer text-white
            max-[885px]:-ml-1"
          onClick={handleToggleMobileMenu}
        >
          <Menu className="block size-6" />
        </li>
      </ul>
      <MobileMenu
        display={!mobileMenuStatus ? "none" : "block"}
        productsCategories={props.productsCategories}
      />
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/80 transition-all duration-1000",
          !mobileMenuStatus ? "hidden" : "block"
        )}
        onClick={handleToggleMobileMenu}
      />
    </nav>
  );
}
