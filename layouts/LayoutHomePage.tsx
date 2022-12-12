import React from "react";
import Head from "next/head";
// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// COMPONENTS
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H2, P } from "components/Texts/Typographies";
import { WhiteButton } from "components/Inputs/Buttons";
import BigHorizontalCardList from "components/Lists/BigHorizontalCardList";
import ProductCardList from "components/Lists/ProductCardList";

type LayoutHomePageProps = {
  postData: any;
  productData: any;
  layoutDescription: string;
};

/**
 * Home Page Layout Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Home Page Layout Component.
 */
export default function LayoutHomePage(props: LayoutHomePageProps) {
  return (
    <>
      <Head>
        <title>{`Mub Music | ${props.layoutDescription}`}</title>
        <meta name="description" content={props.layoutDescription} />
        <meta
          property="og:title"
          content={`Mub Music | ${props.layoutDescription}`}
          key="title"
        />
        <meta property="og:description" content={props.layoutDescription} />
        <meta
          property="og:url"
          content={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/`}
        />
        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/images/mub-logo-icon.png`}
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:alt" content={props.layoutDescription} />
        <meta
          name="twitter:text:title"
          content={`Mub Music | ${props.layoutDescription}`}
        />
        <meta
          name="twitter:image"
          content={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/images/mub-logo-icon.png`}
        />
        <meta name="twitter:image:alt" content={props.layoutDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          itemProp="thumbnailUrl"
          href={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/images/mub-logo-icon.png`}
        />
        <link
          rel="canonical"
          href={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/`}
        />
      </Head>
      <Header />
      <main>
        <Container maxWidth="xl">
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{ marginTop: 50 }}
            >
              <Grid item xs={12} sm={12} md={9}>
                <H2
                  fontType={"MainTitle"}
                  fontColor={({ theme }) => theme.colors.text_4}
                  fontWeight={400}
                  fontSize={76}
                  lineHeight={100}
                  xsFontSize={60}
                  xsLineHeight={70}
                  margin={0}
                >
                  Mub Music is on the way...
                </H2>
                <P
                  fontColor={({ theme }) => theme.colors.text_4}
                  fontWeight={300}
                  fontSize={24}
                  lineHeight={40}
                  xsFontSize={21}
                  xsLineHeight={36}
                  margin={`30px 0`}
                >
                  More on this later...
                </P>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 3, md: 5 }}
              style={{ marginTop: 80 }}
            >
              <Grid item xs={12} sm={12} md={9}>
                <Grid item xs={12} style={{ marginTop: 40 }}>
                  <H2
                    fontColor={({ theme }) => theme.colors.text_4}
                    fontWeight={600}
                    fontSize={22}
                    lineHeight={21}
                    xsFontSize={21}
                    xsLineHeight={24}
                    margin={`0 0 35px 0`}
                  >
                    Featured Products
                  </H2>
                </Grid>
                <Grid item xs={12}>
                  <ProductCardList productList={props.productData} />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Grid container>
                  <Grid item xs={12} style={{ marginTop: 40 }}>
                    <H2
                      fontColor={({ theme }) => theme.colors.text_4}
                      fontWeight={600}
                      fontSize={22}
                      lineHeight={21}
                      xsFontSize={21}
                      xsLineHeight={24}
                      margin={`0 0 30px 0`}
                    >
                      Latest News
                    </H2>
                    <BigHorizontalCardList postList={props.postData} />
                    <Grid item xs={12}>
                      <div style={{ display: "flex" }}>
                        <WhiteButton
                          href="/news/"
                          width={`100%`}
                          margin={`0 0 30px 0`}
                        >
                          More news
                        </WhiteButton>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}
