import React from "react";
import Head from "next/head";
import styled from "styled-components";
// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// COMPONENTS
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
// SERVICES
import ProductPageSEOConstructor from "services/SEO/ProductPageSEOConstructor";
// TYPES
import { ProductType } from "types/productType";

const LayoutProductWrapper = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  margin-top: 20px;
  padding: 30px 0 10px 0;
  border-top: 1px solid #444;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-top: 50px;
  }
`;

type LayoutProductPageProps = {
  productData: ProductType;
};

/**
 * Layout Product Page.
 * @param {any} props Data Fetched.
 * @return {TSX.Element}: The TSX code for the Layout Product Page.
 */
export default function LayoutProductPage(props: LayoutProductPageProps) {
  console.log("PROPS: ", props);
  const productPrefix = props.productData;
  return (
    <>
      <Head>
        <title>{`${productPrefix.title} | Mub Music`}</title>
        <ProductPageSEOConstructor productData={productPrefix} />
      </Head>
      <Header />
      <LayoutProductWrapper>
        <Container>
          <Box sx={{ width: "100%", marginBottom: 2 }}>
            <Grid container rowSpacing={1} spacing={2}>
              <Grid item xs={12}>
                A B C...
              </Grid>
            </Grid>
          </Box>
        </Container>
      </LayoutProductWrapper>
      <Footer />
    </>
  );
}
