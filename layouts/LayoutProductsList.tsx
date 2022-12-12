import React from "react";
import Head from "next/head";
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
import { WhiteButton } from "components/Inputs/Buttons";
import ProductCardList from "components/Lists/ProductCardList";

type LayoutProductsListProps = {
  productData: any;
  productCategoriesData: any;
  productSubCategories: any;
  layoutDescription: string;
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
        <title>{`Mub Music | Products`}</title>
        <meta name="description" content={props.layoutDescription} />
        <meta
          property="og:title"
          content={`Mub Music | Products`}
          key="title"
        />
        <meta property="og:description" content={props.layoutDescription} />
        <meta
          property="og:url"
          content={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/`}
        />
        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/images/mub-logo-icon.png`}
        />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:alt" content={props.layoutDescription} />
        <meta name="twitter:text:title" content={`Mub Music | Products`} />
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
          href={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/`}
        />
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
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
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
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
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
                    <AccordionDetails>Cc</AccordionDetails>
                  </Accordion>
                  <Accordion className="accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="price-average-acc"
                      id="price-average-acc"
                    >
                      <span>Price Average</span>
                    </AccordionSummary>
                    <AccordionDetails>Dd</AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Grid item xs={12} style={{ marginTop: 40 }}>
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
                    margin={`5px 0 15px 0`}
                  >
                    {props.layoutDescription}
                  </P>
                </Grid>
                <Grid item xs={12}>
                  <ProductCardList productList={props.productData} />
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex" }}>
                    <WhiteButton href="/" width={`100%`} margin={`30px 0`}>
                      Load more
                    </WhiteButton>
                  </div>
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
