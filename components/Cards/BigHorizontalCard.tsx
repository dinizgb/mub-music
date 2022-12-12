import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { H3, H4, Span } from "components/Texts/Typographies";
import Avatar from "@mui/material/Avatar";
import formatDate from "utils/formatDate";

const BigHorizontalCardWrapper = styled.div<BigHorizontalCardWrapperProps>`
  width: 100%;
  position: relative;
  margin: ${(props) => props.margin};
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary_hover};
  }
`;

const BigHorizontalCardText = styled.div`
  margin-top: 25px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 90%;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    h3 {
      margin-top: 5px;
      margin-left: 0;
    }
    h4,
    span {
      margin-left: 0;
    }
  }
`;

const BigHorizontalCardAuthor = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-left: 40px;
  margin-bottom: 30px;
  display: flex;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 90%;
    margin-top: 20px;
    margin-left: 0;
  }
`;

const BigHorizontalCardThumb = styled.div`
  width: 90%;
  height: 280px;
  position: relative;
  margin-top: 40px;
  margin-bottom: 40px;
  background: ${({ theme }) => theme.colors.secondary};
  img {
    border-radius: 8px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 90%;
    margin-top: 0;
    margin-bottom: 25px;
    margin-left: auto;
    margin-right: auto;
  }
`;

type BigHorizontalCardProps = {
  key: string;
  cardImage: string;
  cardSection: string;
  cardCategory: string;
  cardCategorySlug: string;
  cardTitle: string;
  cardSlug: string;
  cardExcerpt: string;
  date: string;
  margin?: any;
};

type BigHorizontalCardWrapperProps = {
  margin?: any;
};

/**
 * Mobile Menu Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Mobile Menu Component.
 */
export default function BigHorizontalCard(props: BigHorizontalCardProps) {
  return (
    <a
      href={`/${props.cardSection}/${props.cardCategorySlug}/${props.cardSlug}/`}
    >
      <BigHorizontalCardWrapper margin={props.margin}>
        <Box sx={{ width: "100%" }}>
          <Grid container columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
            <Grid item xs={12} sm={6} md={6}>
              <BigHorizontalCardText>
                <Grid container>
                  <Grid item xs={12}>
                    <Span
                      fontColor={({ theme }) => theme.colors.text_2}
                      fontWeight={500}
                      fontSize={15}
                      lineHeight={24}
                      xsFontSize={15}
                      xsLineHeight={24}
                      margin={`0 0 0 40px`}
                    >
                      {props.cardCategory}
                    </Span>
                    <H3
                      fontColor={({ theme }) => theme.colors.text_4}
                      fontWeight={400}
                      fontSize={21}
                      lineHeight={36}
                      xsFontSize={21}
                      xsLineHeight={36}
                      margin={`5px 0 0 40px`}
                    >
                      {props.cardTitle}
                    </H3>
                    <H4
                      fontColor={({ theme }) => theme.colors.text_2}
                      fontWeight={400}
                      fontSize={16}
                      lineHeight={30}
                      xsFontSize={16}
                      xsLineHeight={30}
                      margin={`10px 0 0 40px`}
                      dangerouslySetInnerHTML={{
                        __html: props.cardExcerpt,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <BigHorizontalCardAuthor>
                      <Avatar alt="Autor Avatar" src="/images/mub-avatar.jpg" />
                      <Span
                        fontColor={({ theme }) => theme.colors.text_4}
                        hoverColor={({ theme }) => theme.colors.text_3}
                        fontWeight={400}
                        fontSize={15}
                        lineHeight={24}
                        xsFontSize={15}
                        xsLineHeight={24}
                        margin={`5px 0 0 10px`}
                      >
                        Mub Music Staff at {formatDate(props.date)}
                      </Span>
                    </BigHorizontalCardAuthor>
                  </Grid>
                </Grid>
              </BigHorizontalCardText>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <BigHorizontalCardThumb>
                <Image
                  src={props.cardImage}
                  alt={props.cardTitle}
                  layout="fill"
                  objectFit="cover"
                />
              </BigHorizontalCardThumb>
            </Grid>
          </Grid>
        </Box>
      </BigHorizontalCardWrapper>
    </a>
  );
}
