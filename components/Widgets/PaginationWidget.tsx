"use client";

import type { AnchorHTMLAttributes } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Span } from "components/Texts/Typographies";
import { cn } from "@/lib/utils";
import { AnalyticsEvents } from "lib/analytics/events";
import { trackEvent } from "lib/analytics/track";
import { buildPaginationItems } from "utils/buildPaginationItems";

type PaginationWidgetProps = {
  totalItens: number;
  currentPage: number;
  range: number;
};

type PaginationBulletProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active: boolean;
};

/**
 * Pagination bullet link.
 * @param {PaginationBulletProps} props Bullet props.
 * @return {TSX.Element} Styled pagination bullet.
 */
export function PaginationBullet({
  active,
  className,
  ...props
}: PaginationBulletProps) {
  return (
    <a
      className={cn(
        `font-open ml-1.5 flex size-9 shrink-0 items-center justify-center
        rounded-full border-2 text-sm font-semibold sm:ml-2.5 sm:size-10
        sm:text-base`,
        active
          ? "border-primary-hover bg-primary-hover text-background"
          : "border-subtitle bg-background text-text-4",
        `hover:border-primary-hover hover:bg-primary-hover
        hover:text-background`,
        className
      )}
      {...props}
    />
  );
}

/**
 * Pagination Widget Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Pagination Widget Component.
 */
export default function PaginationWidget(props: PaginationWidgetProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const bulletLink = (item: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(item));
    return `${pathname}?${params.toString()}`;
  };
  const totalPages = Math.ceil(props.totalItens / props.range);
  const pagination = buildPaginationItems(props.currentPage, totalPages);
  return (
    <>
      {pagination.length > 0 ? (
        <div className="mx-auto flex flex-wrap justify-end">
          {pagination.map((item, index) => {
            return typeof item === "number" ? (
              <PaginationBullet
                key={item}
                active={props.currentPage == item}
                href={bulletLink(item)}
                onClick={() =>
                  trackEvent(AnalyticsEvents.PAGINATION_CLICKED, {
                    page: item,
                    url: bulletLink(item),
                  })
                }
              >
                {item}
              </PaginationBullet>
            ) : (
              <Span
                key={`ellipsis-${index}`}
                className="text-subtitle hover:text-subtitle mt-1.25 mr-1
                  ml-3.25"
                fontWeight={400}
                fontSize={16}
                lineHeight={24}
                xsFontSize={16}
                xsLineHeight={24}
              >
                {item}
              </Span>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
