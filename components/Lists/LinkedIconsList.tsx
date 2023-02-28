import React from "react";
import Image from "next/image";
import styled from "styled-components";
// COMPONENTS
import { H3, H4, Span } from "components/Texts/Typographies";

const LinkedIconsListWrapper = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  margin: 0 0 30px 0;
  padding: 0 0 10px 0;
  width: 100%;
`;

const LinkedIconsListTop = styled.div<LinkedIconsListTopProps>`
  background: ${(props) =>
    props.isPrimaryTitle
      ? ({ theme }) => theme.colors.primary
      : ({ theme }) => theme.colors.text_1};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  color: ${(props) =>
    props.isPrimaryTitle
      ? ({ theme }) => theme.colors.background
      : ({ theme }) => theme.colors.text_4};
  padding: 10px 20px;
`;

const LinkedIconsListUl = styled.ul`
  display: flex;
  flex-direction: column;
  padding-inline-start: 0;
  padding: 10px 20px;
`;

const LinkedIconsListLi = styled.li`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-inline-start: 0;
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line_bottom};
  figure {
    display: flex;
    flex-direction: row;
  }
  div {
    display: flex;
    flex-direction: column;
  }
`;

const LinkedIconsListLiLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  margin-right: 15px;
  img {
    border-radius: 50%;
  }
`;

type LinkedIconsListProps = {
  isPrimaryTitle: boolean;
  title: string;
};

type LinkedIconsListTopProps = {
  isPrimaryTitle: boolean;
};

/**
 * Linked Icons List Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Linked Icons List Component.
 */
export default function LinkedIconsList(props: LinkedIconsListProps) {
  return (
    <LinkedIconsListWrapper>
      <LinkedIconsListTop isPrimaryTitle={props.isPrimaryTitle}>
        <H3
          fontColor={
            props.isPrimaryTitle
              ? ({ theme }) => theme.colors.background
              : ({ theme }) => theme.colors.text_4
          }
          fontWeight={props.isPrimaryTitle ? 700 : 600}
          fontSize={21}
          lineHeight={36}
          xsFontSize={21}
          xsLineHeight={36}
          margin={0}
        >
          {props.title}
        </H3>
      </LinkedIconsListTop>
      <LinkedIconsListUl>
        <LinkedIconsListLi>
          <figure>
            <LinkedIconsListLiLogo>
              <Image
                src={
                  "https://dev-api-mubmusic.crdps.xyz/wp-content/uploads/2022/10/channels4_profile.jpg"
                }
                alt={
                  "productPrefix.product_info.brand.brand_info.thumbnail.altText"
                }
                layout="fill"
                objectFit="cover"
              />
            </LinkedIconsListLiLogo>
            <H4
              fontColor={({ theme }) => theme.colors.text_4}
              fontWeight={400}
              fontSize={17}
              lineHeight={36}
              xsFontSize={17}
              xsLineHeight={36}
              margin={0}
            >
              Guitar Center
            </H4>
          </figure>
          <div>
            <Span
              fontColor={({ theme }) => theme.colors.subtitle}
              fontWeight={400}
              fontSize={14}
              lineHeight={16}
              xsFontSize={14}
              xsLineHeight={16}
              margin={`0 0 6px 0`}
            >
              From
            </Span>
            <Span
              fontColor={({ theme }) => theme.colors.text_4}
              fontWeight={400}
              fontSize={18}
              lineHeight={18}
              xsFontSize={18}
              xsLineHeight={18}
              margin={`0`}
            >
              $89.90
            </Span>
          </div>
        </LinkedIconsListLi>
        <LinkedIconsListLi>
          <figure>
            <LinkedIconsListLiLogo>
              <Image
                src={
                  "https://dev-api-mubmusic.crdps.xyz/wp-content/uploads/2022/10/channels4_profile.jpg"
                }
                alt={
                  "productPrefix.product_info.brand.brand_info.thumbnail.altText"
                }
                layout="fill"
                objectFit="cover"
              />
            </LinkedIconsListLiLogo>
            <H4
              fontColor={({ theme }) => theme.colors.text_4}
              fontWeight={400}
              fontSize={17}
              lineHeight={36}
              xsFontSize={17}
              xsLineHeight={36}
              margin={0}
            >
              Guitar Center
            </H4>
          </figure>
          <div>
            <Span
              fontColor={({ theme }) => theme.colors.subtitle}
              fontWeight={400}
              fontSize={14}
              lineHeight={16}
              xsFontSize={14}
              xsLineHeight={16}
              margin={`0 0 6px 0`}
            >
              From
            </Span>
            <Span
              fontColor={({ theme }) => theme.colors.text_4}
              fontWeight={400}
              fontSize={18}
              lineHeight={18}
              xsFontSize={18}
              xsLineHeight={18}
              margin={`0`}
            >
              $89.90
            </Span>
          </div>
        </LinkedIconsListLi>
      </LinkedIconsListUl>
    </LinkedIconsListWrapper>
  );
}
