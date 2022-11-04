import React from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H2, P } from "components/Texts/Typographies";
import BigHorizontalCardList from "components/Lists/BigHorizontalCardList";
import CategoryPageSEOConstructor from "services/SEO/CategoryPageSEOConstructor";

type LayoutListWithAsideProps = {
  postData: any;
  TopFiveWidgetData: any;
  TopFiveWidgetTitle: string;
  layoutSection: string;
  layoutTitle: string;
  layoutSlug: string;
  layoutDescription: string;
};

/**
 * List with Aside Layout Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the List with Aside Layout Component.
 */
export default function LayoutListWithAside(props: LayoutListWithAsideProps) {
  const postList = props.postData;

  return (
    <>
      <Head>
        <title>
          {props.layoutTitle} | Mub Music | {props.layoutDescription}
        </title>
        <CategoryPageSEOConstructor
          categoryPageTitle={props.layoutTitle}
          categoryPageExcerpt={props.layoutDescription}
          categoryPageSectionSlug={props.layoutSection}
          categoryPageSlug={props.layoutSlug}
        />
        <link
          rel="canonical"
          href={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/${
            props.layoutSection
          }/${props.layoutSlug ? props.layoutSlug + "/" : ""}`}
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
                  {props.layoutTitle}
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
                  {props.layoutDescription}
                </P>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Grid container columnSpacing={{ xs: 1, sm: 3, md: 5 }}>
              <Grid item xs={12} sm={12} md={8}>
                <Grid container>
                  <Grid item xs={12} style={{ marginTop: 41 }}>
                    {postList.length == 0 ? (
                      `No data available`
                    ) : (
                      <BigHorizontalCardList
                        postList={postList}
                        layoutSection={props.layoutSection}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                No data available for now
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}
