"use client";

import Image from "next/image";
import Nav from "./Nav";
import Anchor from "components/Tags/Anchor";
import { ProductsCategoriesType } from "types/productsCategoriesType";
import { cn } from "@/lib/utils";
import { i18n } from "@/i18n";
import { AnalyticsEvents } from "lib/analytics/events";

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
        "relative z-50 py-4 pb-2.75",
        !props.noBg && "border-b border-white/20"
      )}
    >
      <div className="mx-auto w-full max-w-screen-2xl px-4">
        <div className="flex w-full items-center gap-6.25">
          <div className="shrink-0">
            <Anchor
              href="/"
              title={i18n.header.home}
              event={AnalyticsEvents.HEADER_LOGO_CLICKED}
              properties={{ url: "/" }}
            >
              <Image
                src={"/images/mub-logo-icon.png"}
                alt={i18n.header.logoAlt}
                width={31}
                height={35}
              />
            </Anchor>
          </div>
          <div className="min-w-0 flex-1">
            <Nav
              productsCategories={props.productsCategories}
              noSearch={props.noSearch}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
