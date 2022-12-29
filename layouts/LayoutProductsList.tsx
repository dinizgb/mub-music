/* eslint-disable new-cap */
import React from "react";
import Head from "next/head";
import styled from "styled-components";
// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// COMPONENTS
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H2, H3, P } from "components/Texts/Typographies";
import PaginationWidget from "components/Widgets/PaginationWidget";
import ProductCardList from "components/Lists/ProductCardList";
// SERVICES
import SEOTagsConstructor from "services/SEO/SEOTagsConstructor";
// TYPES
import { SEOTagsConstructorTypes } from "types/SEOTagsConstructorTypes";

const TotalAreaWrapper = styled.div`
  text-align: right;
  margin-top: 75px;
  @media (max-width: 600px) {
    text-align: left;
    margin-top: 0;
    margin-bottom: 20px;
  }
`;

type LayoutProductsListProps = {
  productData: any;
  productCategoriesData: any;
  productCategoryData: any;
  productSubCategories: any;
  productSubCategoryData: any;
  productBrandsData: any;
  productPriceAverageData: any;
  seoData: SEOTagsConstructorTypes;
  totalCount: number;
};
/**
 * Layout Products List Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Layout Products List Component.
 */
export default function LayoutProductsList(props: LayoutProductsListProps) {
  return (
    <>
      <Head>
        <title>{`${props.seoData.pageTitle} | Mub Music`}</title>
        {SEOTagsConstructor(props.seoData)}
      </Head>
      <Header />
      <main>
        <Container maxWidth="xl">
          <Box sx={{ width: "100%" }}>
            <Grid container columnSpacing={{ xs: 1, sm: 3, md: 5 }}>
              <Grid item xs={12} sm={12} md={3}>
                <Grid item xs={12} style={{ marginTop: 45 }}>
                  <H3
                    fontColor={({ theme }) => theme.colors.text_4}
                    fontWeight={600}
                    fontSize={22}
                    lineHeight={21}
                    xsFontSize={21}
                    xsLineHeight={24}
                    margin={`0 0 35px 0`}
                  >
                    Filters
                  </H3>
                </Grid>
                <Grid item xs={12}>
                  <Accordion className="accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="categories-acc"
                      id="categories-acc"
                    >
                      <span>Categories</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="category-group-label"
                          defaultValue={
                            props.productCategoryData
                              ? props.productCategoryData
                              : ""
                          }
                          name="category-group"
                        >
                          {props.productCategoriesData.map(
                            ({ title, slug }) => {
                              return (
                                <FormControlLabel
                                  key={slug}
                                  value={slug}
                                  control={<Radio />}
                                  label={title}
                                />
                              );
                            }
                          )}
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className="accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="subcategories-acc"
                      id="subcategories-acc"
                    >
                      <span>Subcategories</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="subcategory-group-label"
                          name="subcategory-group"
                          defaultValue={
                            props.productSubCategoryData
                              ? props.productSubCategoryData
                              : ""
                          }
                        >
                          {props.productSubCategories.map(({ title, slug }) => {
                            return (
                              <FormControlLabel
                                key={slug}
                                value={slug}
                                control={<Radio />}
                                label={title}
                              />
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className="accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="brands-acc"
                      id="brands-acc"
                    >
                      <span>Brands</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="brand-group-label"
                          defaultValue={
                            props.productBrandsData
                              ? props.productBrandsData
                              : ""
                          }
                          name="brand-group"
                        >
                          {props.productBrandsData.map(({ title, slug }) => {
                            return (
                              <FormControlLabel
                                key={slug}
                                value={slug}
                                control={<Radio />}
                                label={title}
                              />
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion className="accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="price-average-acc"
                      id="price-average-acc"
                    >
                      <span>Price Average</span>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="price-average-group-label"
                          defaultValue={
                            props.productPriceAverageData
                              ? props.productPriceAverageData
                              : ""
                          }
                          name="price-average-group"
                        >
                          {props.productPriceAverageData.map(
                            ({ title, slug }) => {
                              return (
                                <FormControlLabel
                                  key={slug}
                                  value={slug}
                                  control={<Radio />}
                                  label={title}
                                />
                              );
                            }
                          )}
                        </RadioGroup>
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Grid container columnSpacing={{ xs: 1, sm: 3, md: 5 }}>
                  <Grid item md={8} sm={6} xs={12} style={{ marginTop: 40 }}>
                    <H2
                      fontColor={({ theme }) => theme.colors.text_4}
                      fontWeight={600}
                      fontSize={26}
                      lineHeight={30}
                      xsFontSize={26}
                      xsLineHeight={30}
                      margin={`0`}
                    >
                      {props.seoData.pageTitle}
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
                      {props.seoData.pageExcerpt}
                    </P>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
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
                <Grid item xs={12} style={{ marginTop: 5 }}>
                  <ProductCardList productList={props.productData} />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 30 }}>
                  <PaginationWidget
                    totalItens={9543}
                    currentPage={7}
                    range={20}
                  />
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
