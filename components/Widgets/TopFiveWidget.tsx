/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";
import { H2 } from "components/Texts/Typographies";
import SmallHorizontalCard from "../Cards/SmallHorizontalCard";

const TopFiveWidgetWrapper = styled.div<TopFiveWidgetWrapperCssProps>`
  width: 100%;
  position: relative;
  margin: ${(props) => props.margin};
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  padding: 20px 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin: ${(props) => props.xsMargin};
  }
`;

const TopFiveWidgetContainer = styled.div`
  width: 90%;
  position: relative;
  margin: 0 auto;
`;

type TopFiveWidgetWrapperCssProps = {
  margin?: any;
  xsMargin?: any;
};

type TopFiveWidgetWrapperProps = {
  title: string;
  data: any;
  margin?: any;
  xsMargin?: any;
};

/**
 * Top Five Widget Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Top Five Widget Component.
 */
export default function TopFiveWidget(props: TopFiveWidgetWrapperProps) {
  return (
    <TopFiveWidgetWrapper margin={props.margin} xsMargin={props.xsMargin}>
      <TopFiveWidgetContainer>
        <H2
          fontColor={({ theme }) => theme.colors.text_4}
          fontWeight={600}
          fontSize={20}
          lineHeight={21}
          xsFontSize={21}
          xsLineHeight={24}
          margin={0}
        >
          {props.title}
        </H2>
        {props.data.map(({ featured_media_url, title, date, link, slug }) => {
          return (
            <SmallHorizontalCard
              key={slug}
              cardTitle={title.rendered}
              cardDate={date}
              cardImage={featured_media_url}
              cardLink={link}
              margin={0}
            />
          );
        })}
      </TopFiveWidgetContainer>
    </TopFiveWidgetWrapper>
  );
}
