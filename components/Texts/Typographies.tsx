import styled from "styled-components";

type TypographyProps = {
  fontType?: string;
  fontColor: any;
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
  margin?: any;
  padding?: any;
  smFontSize?: number;
  smLineHeight?: number;
  xsFontSize?: number;
  xsLineHeight?: number;
  borderBottom?: string;
  hoverColor?: any;
};

export const H1 = styled.h1<TypographyProps>`
  color: ${(props) => props.fontColor};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  line-height: ${(props) => props.lineHeight}px;
  margin: ${(props) => props.margin};
  @media (max-width: 900px) {
    font-size: ${(props) => props.smFontSize}px;
    line-height: ${(props) => props.smLineHeight}px;
  }
  @media (max-width: 600px) {
    font-size: ${(props) => props.xsFontSize}px;
    line-height: ${(props) => props.xsLineHeight}px;
  }
`;

export const H2 = styled.h2<TypographyProps>`
  font-family: ${(props) =>
    props.fontType == "MainTitle"
      ? `'Poppins', serif;`
      : `'Open Sans', sans-serif`};
  color: ${(props) => props.fontColor};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  line-height: ${(props) => props.lineHeight}px;
  margin: ${(props) => props.margin};
  @media (max-width: 900px) {
    font-size: ${(props) => props.smFontSize}px;
    line-height: ${(props) => props.smLineHeight}px;
  }
  @media (max-width: 600px) {
    font-size: ${(props) => props.xsFontSize}px;
    line-height: ${(props) => props.xsLineHeight}px;
  }
`;

export const H3 = styled.h3<TypographyProps>`
  font-family: "Open Sans", sans-serif;
  color: ${(props) => props.fontColor};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  line-height: ${(props) => props.lineHeight}px;
  margin: ${(props) => props.margin};
  @media (max-width: 900px) {
    font-size: ${(props) => props.smFontSize}px;
    line-height: ${(props) => props.smLineHeight}px;
  }
  @media (max-width: 600px) {
    font-size: ${(props) => props.xsFontSize}px;
    line-height: ${(props) => props.xsLineHeight}px;
  }
`;

export const H4 = styled.h4<TypographyProps>`
  font-family: "Open Sans", sans-serif;
  color: ${(props) => props.fontColor};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  line-height: ${(props) => props.lineHeight}px;
  margin: ${(props) => props.margin};
  @media (max-width: 900px) {
    font-size: ${(props) => props.smFontSize}px;
    line-height: ${(props) => props.smLineHeight}px;
  }
  @media (max-width: 600px) {
    font-size: ${(props) => props.xsFontSize}px;
    line-height: ${(props) => props.xsLineHeight}px;
  }
`;

export const P = styled.p<TypographyProps>`
  font-family: "Open Sans", sans-serif;
  color: ${(props) => props.fontColor};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  line-height: ${(props) => props.lineHeight}px;
  margin: ${(props) => props.margin};
  @media (max-width: 900px) {
    font-size: ${(props) => props.smFontSize}px;
    line-height: ${(props) => props.smLineHeight}px;
  }
  @media (max-width: 600px) {
    font-size: ${(props) => props.xsFontSize}px;
    line-height: ${(props) => props.xsLineHeight}px;
  }
`;

export const Span = styled.span<TypographyProps>`
  font-family: "Open Sans", sans-serif;
  color: ${(props) => props.fontColor};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  line-height: ${(props) => props.lineHeight}px;
  margin: ${(props) => props.margin};
  @media (max-width: 900px) {
    font-size: ${(props) => props.smFontSize}px;
    line-height: ${(props) => props.smLineHeight}px;
  }
  @media (max-width: 600px) {
    font-size: ${(props) => props.xsFontSize}px;
    line-height: ${(props) => props.xsLineHeight}px;
  }
`;

export const A = styled.a<TypographyProps>`
  font-family: "Open Sans", sans-serif;
  color: ${(props) => props.fontColor};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  line-height: ${(props) => props.lineHeight}px;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-bottom: ${(props) => props.borderBottom};
  &:hover {
    color: ${(props) => props.hoverColor};
  }
  @media (max-width: 900px) {
    font-size: ${(props) => props.smFontSize}px;
    line-height: ${(props) => props.smLineHeight}px;
  }
  @media (max-width: 600px) {
    font-size: ${(props) => props.xsFontSize}px;
    line-height: ${(props) => props.xsLineHeight}px;
  }
`;

export const FaviconText = styled.em<TypographyProps>`
  font-family: "Poppins", serif;
  color: ${(props) => props.fontColor};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  font-style: normal;
  line-height: ${(props) => props.lineHeight}px;
  margin: ${(props) => props.margin};
  @media (max-width: 900px) {
    font-size: ${(props) => props.smFontSize}px;
    line-height: ${(props) => props.smLineHeight}px;
  }
  @media (max-width: 600px) {
    font-size: ${(props) => props.xsFontSize}px;
    line-height: ${(props) => props.xsLineHeight}px;
  }
`;
