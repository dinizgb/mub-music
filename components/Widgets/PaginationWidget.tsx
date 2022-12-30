/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";
import { Span } from "components/Texts/Typographies";

const PaginationWidgetWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin: 0 auto;
`;

export const PaginationBullet = styled.a<PaginationBulletProps>`
  width: 18px;
  height: 18px;
  font-family: "Open Sans", sans-serif;
  background: ${(props) =>
    props.active
      ? ({ theme }) => theme.colors.primary_hover
      : ({ theme }) => theme.colors.background};
  border: 2px solid
    ${(props) =>
      props.active
        ? ({ theme }) => theme.colors.primary_hover
        : ({ theme }) => theme.colors.subtitle};
  border-radius: 50%;
  color: ${(props) =>
    props.active
      ? ({ theme }) => theme.colors.background
      : ({ theme }) => theme.colors.text_4};
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 0 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.colors.primary_hover};
    color: ${({ theme }) => theme.colors.background};
    border: 2px solid ${({ theme }) => theme.colors.primary_hover};
  }
`;

type PaginationWidgetProps = {
  totalItens: number;
  currentPage: number;
  range: number;
};

type PaginationBulletProps = {
  active: boolean;
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
    { length: Math.ceil(props.totalItens / props.range) },
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
            return !isNaN(item) ? (
              <PaginationBullet
                key={item}
                active={props.currentPage == item}
                href="#"
              >
                {item}
              </PaginationBullet>
            ) : (
              <>
                <Span
                  fontColor={({ theme }) => theme.colors.subtitle}
                  hoverColor={({ theme }) => theme.colors.subtitle}
                  fontWeight={400}
                  fontSize={16}
                  lineHeight={24}
                  xsFontSize={16}
                  xsLineHeight={24}
                  margin={`5px 4px 0 13px`}
                >
                  {item}
                </Span>
              </>
            );
          })}
        </PaginationWidgetWrapper>
      ) : null}
    </>
  );
}
