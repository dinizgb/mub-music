/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";
import { Span } from "components/Texts/Typographies";

const PaginationWidgetWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin: 0 auto;
`;

type PaginationWidgetProps = {
  totalItens: number;
  currentPage: number;
  range: number;
};

/**
 * Pagination Widget Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Pagination Widget Component.
 */
export default function PaginationWidget(props: PaginationWidgetProps) {
  const hasPages: boolean = props.totalItens > props.range ? true : false;
  const totalPages: number = Math.floor(props.totalItens / props.range);
  const smallerPaginationsRule: Array<number> = Array.from(
    { length: props.totalItens / props.range },
    (_, i) => i + 1
  );
  const biggerPaginationsRule: Array<any> =
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
        : [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages] // else
      : null;
  const pagination: Array<any> =
    totalPages > 9 ? biggerPaginationsRule : smallerPaginationsRule;
  return (
    <>
      {hasPages ? (
        <PaginationWidgetWrapper>
          {pagination.map((item) => {
            return (
              <Span
                key={item}
                fontColor={({ theme }) => theme.colors.text_2}
                fontWeight={600}
                fontSize={17}
                lineHeight={24}
                xsFontSize={17}
                xsLineHeight={24}
                margin={`0 0 0 10px`}
              >
                {item}
              </Span>
            );
          })}
        </PaginationWidgetWrapper>
      ) : null}
    </>
  );
}
