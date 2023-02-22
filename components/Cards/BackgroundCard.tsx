import React from "react";
import styled from "styled-components";
import { H4 } from "components/Texts/Typographies";

const BackgroundCardWrapper = styled.div<BackgroundCardWrapperProps>`
  background: url(${(props) => props.background});
  background-size: cover;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  min-height: 200px;
  width: 100%;
  a {
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: end;
    padding: 20px 15px;
    h4 {
      text-transform: uppercase;
    }
  }
  a:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

type BackgroundCardProps = {
  backgroundCardThumbnail: string;
  backgroundCardUrl: string;
  backgroundCardTitle: string;
};

type BackgroundCardWrapperProps = {
  background: string;
};

/**
 * Background Card Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Footer Component.
 */
export default function BackgroundCard(props: BackgroundCardProps) {
  return (
    <BackgroundCardWrapper background={props.backgroundCardThumbnail}>
      <a href={props.backgroundCardUrl}>
        <H4
          fontColor={({ theme }) => theme.colors.text_4}
          fontWeight={700}
          fontSize={20}
          lineHeight={24}
          xsFontSize={24}
          xsLineHeight={24}
          margin={`45px 0 0 0`}
        >
          {props.backgroundCardTitle}
        </H4>
      </a>
    </BackgroundCardWrapper>
  );
}
