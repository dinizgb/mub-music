"use client";

import { Menu } from "lucide-react";
import MobileMenu from "../Menus/MobileMenu";
import { useAppSelector, useAppDispatch } from "redux/store";
import { toggleMobileMenu } from "redux/slices/mobileMenu/";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { cn } from "@/lib/utils";

type NavProps = {
  productsCategories: ProductsCategoriesType[];
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
    dispatch(toggleMobileMenu(!mobileMenuStatus ? true : false));
  };

  return (
    <nav className="float-right max-[768px]:p-0">
      <ul className="flex flex-row">
        <li className="hidden pl-6.25 min-[886px]:flex">
          <a
            href="/news/"
            className="font-heading hover:text-primary-hover
              font-medium tracking-[0.5px] text-white no-underline"
          >
            News
          </a>
        </li>
        <li className="hidden pl-6.25 min-[886px]:flex">
          <a
            href="/products/"
            className="font-heading hover:text-primary-hover
              font-medium tracking-[0.5px] text-white no-underline"
          >
            Products
          </a>
        </li>
        <li
          className="hover:text-primary-hover cursor-pointer pl-6.25
            text-white"
          onClick={handleToggleMobileMenu}
        >
          <Menu />
        </li>
        <MobileMenu
          display={!mobileMenuStatus ? "none" : "block"}
          productsCategories={props.productsCategories}
        />
        <div
          className={cn(
            "fixed inset-0 z-25 bg-black/80 transition-all duration-1000",
            !mobileMenuStatus ? "hidden" : "block"
          )}
          onClick={handleToggleMobileMenu}
        />
      </ul>
    </nav>
  );
}
