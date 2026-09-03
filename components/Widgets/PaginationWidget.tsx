"use client";

/* eslint-disable camelcase */
import type { AnchorHTMLAttributes } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Span } from "components/Texts/Typographies";
import { cn } from "@/lib/utils";
import { AnalyticsEvents } from "lib/analytics/events";
import { trackEvent } from "lib/analytics/track";

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
        `font-open ml-2.5 flex size-4.5 items-center justify-center rounded-full
        border-2 p-2.5 text-base font-semibold`,
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
  const hasPages: boolean = props.totalItens > props.range ? true : false;
  const totalPages: number = Math.floor(props.totalItens / props.range);
  const smallerPaginationsRule: Array<number> = Array.from(
    { length: Math.ceil(props.totalItens / props.range) },
    (_, i) => i + 1
  );
  const biggerPaginationsRule: Array<any> | null =
    totalPages > 9
      ? props.currentPage <= 4
        ? [1, 2, 3, 4, "...", totalPages] // if
        : props.currentPage > 4 && props.currentPage < totalPages - 3
          ? [
              1,
              "...",
              props.currentPage,
              props.currentPage + 1,
              props.currentPage + 2,
              "...",
              totalPages,
            ] // else if
          : [
              1,
              "...",
              totalPages - 3,
              totalPages - 2,
              totalPages - 1,
              totalPages,
            ] // else
      : null;
  const pagination: Array<any> =
    totalPages > 9 ? (biggerPaginationsRule ?? []) : smallerPaginationsRule;
  return (
    <>
      {hasPages ? (
        <div className="mx-auto flex justify-end">
          {pagination.map((item) => {
            return !isNaN(item) ? (
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
                key={`ellipsis-${item}`}
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
