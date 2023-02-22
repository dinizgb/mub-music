/* eslint-disable camelcase */
/* eslint-disable new-cap */
import React from "react";
import Head from "next/head";
import styled from "styled-components";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// COMPONENTS
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H2, P } from "components/Texts/Typographies";
import BackgroundCard from "components/Cards/BackgroundCard";
// SERVICES
import SEOTagsConstructor from "services/SEO/SEOTagsConstructor";
// TYPES
import { SEOTagsConstructorTypes } from "types/SEOTagsConstructorTypes";

const LayoutProductCategoryListWrapper = styled.div`
  width: 100%;
  margin: 10px 0 70px 0;
  img {
    width: 100%;
    display: inline-block;
  }
`;

const TotalAreaWrapper = styled.div`
  text-align: right;
  margin-top: 75px;
  @media (max-width: 600px) {
    text-align: left;
    margin-top: 0;
    margin-bottom: 20px;
  }
`;

type LayoutProductCategoryListProps = {
  lastProductsCategories: any;
  seoData: SEOTagsConstructorTypes;
  totalCount: number;
};

/**
 * Footer Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Footer Component.
 */
export default function LayoutProductCategoryList(
  props: LayoutProductCategoryListProps
) {
  return (
    <>
      <Head>
        <title>{`${props.seoData.pageTitle} | Mub Music`}</title>
        {SEOTagsConstructor(props.seoData)}
      </Head>
      <Header />
      <main>
        <LayoutProductCategoryListWrapper>
          <Container>
            <Box sx={{ width: "100%", marginBottom: 2 }}>
              <Grid container columnSpacing={{ xs: 1, sm: 3, md: 5 }}>
                <Grid item md={8} sm={6} xs={8} style={{ marginTop: 40 }}>
                  <H2
                    fontColor={({ theme }) => theme.colors.text_4}
                    fontWeight={600}
                    fontSize={26}
                    lineHeight={30}
                    xsFontSize={26}
                    xsLineHeight={30}
                    margin={`0`}
                  >
                    Products
                  </H2>
                  <P
                    fontColor={({ theme }) => theme.colors.subtitle}
                    fontWeight={400}
                    fontSize={16}
                    lineHeight={40}
                    xsFontSize={16}
                    xsLineHeight={36}
                    margin={`5px 0 10px 0`}
                  >
                    Choose a product category.
                  </P>
                </Grid>
                <Grid item md={4} sm={6} xs={4}>
                  <TotalAreaWrapper>
                    <P
                      fontColor={({ theme }) => theme.colors.subtitle}
                      fontWeight={600}
                      fontSize={15}
                      lineHeight={36}
                      xsFontSize={16}
                      xsLineHeight={36}
                      margin={`0 0 15px 0`}
                    >
                      {`(${props.totalCount} items found)`}
                    </P>
                  </TotalAreaWrapper>
                </Grid>
              </Grid>
              <Grid container columnSpacing={{ xs: 1, sm: 3, md: 5 }}>
                {props.lastProductsCategories.map(
                  ({ product_category_info, slug, title }) => {
                    return (
                      <Grid
                        item
                        md={3}
                        sm={4}
                        xs={12}
                        style={{
                          marginTop: 35,
                        }}
                        key={slug}
                      >
                        <BackgroundCard
                          backgroundCardThumbnail={
                            product_category_info.thumbnail.sourceUrl
                          }
                          backgroundCardUrl={`${slug}`}
                          backgroundCardTitle={title}
                        />
                      </Grid>
                    );
                  }
                )}
              </Grid>
            </Box>
          </Container>
        </LayoutProductCategoryListWrapper>
      </main>
      <Footer />
    </>
  );
}
