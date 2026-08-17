"use client";

import Image from "next/image";
import Nav from "./Nav";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { cn } from "@/lib/utils";
import { i18n } from "@/i18n";

type HeaderProps = {
  noBg?: boolean;
  noSearch?: boolean;
  productsCategories: ProductsCategoriesType[];
};

/**
 * Header Component.
 * @param {HeaderProps} props to the component.
 * @return {TSX.Element}: The TSX code for the Header Component.
 */
export default function Header(props: HeaderProps) {
  return (
    <header
      className={cn(
        "relative z-2 py-4 pb-2.75",
        !props.noBg && "border-b border-white/20"
      )}
    >
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div
          className="grid w-full grid-cols-2 items-center gap-2 sm:gap-4
            md:grid-cols-12 md:gap-6"
        >
          <div className="md:col-span-3">
            <a href="/" title={i18n.header.home}>
              <Image
                src={"/images/mub-logo-icon.png"}
                alt={i18n.header.logoAlt}
                width={31}
                height={35}
              />
            </a>
          </div>
          <div className="md:col-span-9">
            <Nav productsCategories={props.productsCategories} />
          </div>
        </div>
      </div>
    </header>
  );
}
