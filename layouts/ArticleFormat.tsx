import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Image from "next/image";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H2, P, A, Span } from "components/Texts/Typographies";
import { ContentBody } from "components/Texts/ContentBody";
import formatDate from "utils/formatDate";
import SinglePageSEOConstructor from "services/SEO/SinglePageSEOConstructor";

const ArticleFormatThumb = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  img {
    border-radius: 8px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    width: 100%;
    height: 350px;
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ArticleFormatMain = styled.main`
  .MuiBreadcrumbs-separator {
    color: ${({ theme }) => theme.colors.text_2};
  }
`;

const ArticleFormatAuthor = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 90%;
    margin-top: 20px;
    margin-left: 0;
  }
`;

type ArticleFormatProps = {
  articleTitle: string;
  articleExcerpt: string;
  articleSectionName: string;
  articleSectionSlug: string;
  articleCategoryName: string;
  articleCategorySlug: string;
  articleSlug: string;
  articleDate: string;
  articleModifiedDate: string;
  articleAuthor: string;
  articleFeaturedImage: string;
  articleContent: string;
};

/**
 * Article Layout Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Article Layout Component.
 */
export default function ArticleFormat(props: ArticleFormatProps) {
  return (
    <>
      <Head>
        <title>{props.articleTitle + " | Mub Music"}</title>
        <SinglePageSEOConstructor
          singlePageTitle={props.articleTitle}
          singlePageExcerpt={props.articleExcerpt}
          singlePageSectionName={props.articleSectionName}
          singlePageSectionSlug={props.articleSectionSlug}
          singlePageCategoryName={props.articleCategoryName}
          singlePageCategorySlug={props.articleCategorySlug}
          singlePageSlug={props.articleSlug}
          singlePageDate={props.articleDate}
          singlePageModifiedDate={props.articleModifiedDate}
          singlePageFeaturedImage={props.articleFeaturedImage}
          singlePageAuthor={props.articleAuthor}
        />
      </Head>
      <Header />
      <ArticleFormatMain>
        <Container maxWidth="xl">
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{ marginTop: 50 }}
            >
              <Grid item xs={12} sm={12} md={6}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                  <A
                    fontColor={({ theme }) => theme.colors.text_2}
                    hoverColor={({ theme }) => theme.colors.text_4}
                    fontWeight={500}
                    fontSize={15}
                    lineHeight={24}
                    xsFontSize={15}
                    xsLineHeight={24}
                    margin={0}
                    href="/"
                  >
                    Home
                  </A>
                  <A
                    fontColor={({ theme }) => theme.colors.text_2}
                    hoverColor={({ theme }) => theme.colors.text_4}
                    fontWeight={500}
                    fontSize={15}
                    lineHeight={24}
                    xsFontSize={15}
                    xsLineHeight={24}
                    margin={0}
                    href="/news/"
                  >
                    News
                  </A>
                  <A
                    fontColor={({ theme }) => theme.colors.text_2}
                    hoverColor={({ theme }) => theme.colors.text_4}
                    fontWeight={500}
                    fontSize={15}
                    lineHeight={24}
                    xsFontSize={15}
                    xsLineHeight={24}
                    margin={0}
                    href={`/news/${props.articleCategorySlug}/`}
                  >
                    {props.articleCategoryName}
                  </A>
                </Breadcrumbs>
                <H2
                  fontType={"MainTitle"}
                  fontColor={({ theme }) => theme.colors.text_4}
                  fontWeight={400}
                  fontSize={60}
                  lineHeight={85}
                  xsFontSize={40}
                  xsLineHeight={60}
                  margin={0}
                >
                  {props.articleTitle}
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
                  {props.articleExcerpt}
                </P>
                <ArticleFormatAuthor>
                  <Avatar alt="Autor Avatar" src="/images/mub-avatar.jpg" />
                  <Span
                    fontColor={({ theme }) => theme.colors.text_4}
                    hoverColor={({ theme }) => theme.colors.text_3}
                    fontWeight={600}
                    fontSize={15}
                    lineHeight={24}
                    xsFontSize={15}
                    xsLineHeight={24}
                    margin={`5px 0 0 10px`}
                  >
                    Mub Music Staff
                  </Span>
                  <Span
                    fontColor={({ theme }) => theme.colors.text_4}
                    fontWeight={400}
                    fontSize={15}
                    lineHeight={24}
                    xsFontSize={15}
                    xsLineHeight={24}
                    margin={`4px 0 0 5px`}
                  >
                    - {formatDate(props.articleDate)}
                  </Span>
                </ArticleFormatAuthor>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <ArticleFormatThumb>
                  <Image
                    src={props.articleFeaturedImage}
                    alt={props.articleTitle}
                    layout="fill"
                    objectFit="cover"
                  />
                </ArticleFormatThumb>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Grid container columnSpacing={{ xs: 1, sm: 3, md: 5 }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={9}
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <Grid container>
                  <Grid item xs={12} style={{ marginTop: 41 }}>
                    <ContentBody
                      dangerouslySetInnerHTML={{
                        __html: props.articleContent,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ArticleFormatMain>
      <Footer />
    </>
  );
}
