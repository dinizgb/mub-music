import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { H3, Span } from "components/Texts/Typographies";
import StarsWidget from "components/Widgets/StarsWidget";

const ProductCardWrapper = styled.div<ProductCardCssProps>`
  width: 100%;
  min-height: 320px;
  position: relative;
  margin: ${(props) => props.margin};
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary_hover};
  }
  span {
    font-size: 13px;
    strong {
      font-size: 18.5px;
    }
  }
`;

const ProductCardThumb = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  img {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

const ProductCardStars = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const ProductCardBrandLogo = styled.div<ProductCardBrandLogoProps>`
  width: 54px;
  height: 54px;
  position: absolute;
  top: 125px;
  right: 25px;
  background: ${(props) => props.backgroundColor};
  border-radius: 50%;
  img {
    border-radius: 50%;
  }
`;

type ProductCardCssProps = {
  margin?: any;
};

type ProductCardProps = {
  cardTitle: string;
  cardImage: string;
  cardBrandLogo: string;
  cardBrandLogoBgColor: string;
  cardLink: string;
  cardRating: number;
  cardPrice: number;
  margin?: any;
};

type ProductCardBrandLogoProps = {
  backgroundColor: string;
};

/**
 * Product Card Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Product Card Component.
 */
export default function ProductCard(props: ProductCardProps) {
  return (
    <a href={props.cardLink}>
      <ProductCardWrapper margin={props.margin}>
        <Box sx={{ width: "100%" }}>
          <Grid container>
            <Grid item xs={12}>
              <ProductCardThumb>
                <Image
                  src={props.cardImage}
                  alt={props.cardTitle}
                  layout="fill"
                  objectFit="cover"
                />
                <ProductCardStars>
                  <StarsWidget number={props.cardRating} />
                </ProductCardStars>
              </ProductCardThumb>
              <ProductCardBrandLogo
                backgroundColor={props.cardBrandLogoBgColor}
              >
                <Image
                  src={props.cardBrandLogo}
                  alt={props.cardTitle}
                  layout="fill"
                  objectFit="cover"
                />
              </ProductCardBrandLogo>
            </Grid>
            <Grid item xs={12} sx={{ padding: "0 25px" }}>
              <H3
                fontColor={({ theme }) => theme.colors.text_4}
                fontWeight={400}
                fontSize={16}
                lineHeight={24}
                xsFontSize={16}
                xsLineHeight={24}
                margin={`45px 0 5px 0`}
              >
                {props.cardTitle}
              </H3>
              <Span
                fontColor={({ theme }) => theme.colors.primary}
                hoverColor={({ theme }) => theme.colors.primary}
                fontWeight={400}
                fontSize={16}
                lineHeight={24}
                xsFontSize={16}
                xsLineHeight={24}
                margin={`0`}
              >
                From <strong>${props.cardPrice}</strong>
              </Span>
            </Grid>
          </Grid>
        </Box>
      </ProductCardWrapper>
    </a>
  );
}
