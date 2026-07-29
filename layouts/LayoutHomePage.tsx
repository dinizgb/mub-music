"use client";

// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// COMPONENTS
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H2 } from "components/Texts/Typographies";
import { WhiteButton } from "components/Inputs/Buttons";
import HomeSearch from "components/Searchs/HomeSearch";
import BigHorizontalCardList from "components/Lists/BigHorizontalCardList";
import ProductCardList from "components/Lists/ProductCardList";
// TYPES
import { ProductsCategoriesType } from "types/productsCategoriesType";

type LayoutHomePageProps = {
  postData: any;
  productData: any;
  productsCategories: ProductsCategoriesType[];
  layoutDescription: string;
};

/**
 * Home Page Layout Component.
 * @param {LayoutHomePageProps} props to the component.
 * @return {TSX.Element}: The TSX code for the Home Page Layout Component.
 */
export default function LayoutHomePage(props: LayoutHomePageProps) {
  return (
    <>
      <Header noBg={true} productsCategories={props.productsCategories} />
      <HomeSearch />
      <main>
        <Container maxWidth="xl">
          <Box
            sx={{
              backgroundColor: "#080B14",
              position: "relative",
              width: "100%",
              zIndex: 0,
            }}
          >
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
