import React from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ShareIcon from "@mui/icons-material/Share";
// COMPONENTS
import { ContentBody } from "components/Texts/ContentBody";
import Header from "components/Tags/Header";
import Footer from "components/Tags/Footer";
import { H1, H2, H3 } from "components/Texts/Typographies";
import StarsWidget from "components/Widgets/StarsWidget";
import LinkedIconsList from "components/Lists/LinkedIconsList";
import ImageGallery from "react-image-gallery";
import YoutubeIframe from "components/Tags/YoutubeIframe";
// SERVICES
import ProductPageSEOConstructor from "services/SEO/ProductPageSEOConstructor";
// TYPES
import { ProductType } from "types/productType";

const LayoutProductHeader = styled.div`
  width: 100%;
  padding: 30px 0;
  margin: 0 0 30px 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  background-image: url(/images/placeholder-bg.jpg);
  background-attachment: fixed;
  background-position: center 90%;
  h1 {
    margin: 0 40px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    h1 {
      margin: 15px 0 5px 0;
    }
  }
`;

const LayoutProductBrandLogo = styled.div<ProductCardBrandLogoProps>`
  width: 100px;
  height: 100px;
  background: ${(props) => props.backgroundColor};
  border-radius: 50%;
  position: relative;
  img {
    border-radius: 50%;
  }
`;

const RatingArea = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  figure {
    svg {
      font-size: 24px;
      margin-top: 2px;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    div {
      svg {
        font-size: 20px;
        margin-top: 0;
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    align-items: flex-start;
    margin-top: 10px;
  }
`;

const LayoutProductCard = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  padding: 20px 30px;
  margin: 0 0 30px 0;
`;

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
];

type LayoutProductPageProps = {
  productData: ProductType;
};

type ProductCardBrandLogoProps = {
  backgroundColor: string;
};

/**
 * Layout Product Page.
 * @param {LayoutProductPageProps} props to the component.
 * @return {TSX.Element}: The TSX code for the Layout Product Page.
 */
export default function LayoutProductPage(props: LayoutProductPageProps) {
  const productPrefix = props.productData;
  return (
    <>
      <Head>
        <title>{`${productPrefix.title} | Mub Music`}</title>
        <ProductPageSEOConstructor productData={productPrefix} />
      </Head>
      <Header />
      <LayoutProductHeader>
        <Container>
          <Box sx={{ width: "100%", marginBottom: 2 }}>
            <Grid
              container
              rowSpacing={1}
              spacing={2}
              sx={{ alignItems: "center" }}
            >
              <Grid item xs={12} sm={2} md={1}>
                <LayoutProductBrandLogo
                  backgroundColor={
                    productPrefix.product_info.brand.brand_info.backgroundColor
                  }
                >
                  <Image
                    src={
                      productPrefix.product_info.brand.brand_info.thumbnail
                        .sourceUrl
                    }
                    alt={
                      productPrefix.product_info.brand.brand_info.thumbnail
                        .altText
                    }
                    layout="fill"
                    objectFit="cover"
                  />
                </LayoutProductBrandLogo>
              </Grid>
              <Grid item xs={12} sm={8} md={9}>
                <H1
                  fontColor={({ theme }) => theme.colors.text_4}
                  fontWeight={400}
                  fontSize={36}
                  lineHeight={54}
                  xsFontSize={36}
                  xsLineHeight={54}
                  margin={0}
                >
                  {productPrefix.title}
                </H1>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <RatingArea>
                  <H2
                    fontColor={({ theme }) => theme.colors.text_4}
                    fontWeight={600}
                    fontSize={14}
                    lineHeight={21}
                    xsFontSize={14}
                    xsLineHeight={24}
                    margin={"8px 5px 10px 0"}
                  >
                    Rating average
                  </H2>
                  <StarsWidget
                    fontSize={28}
                    number={productPrefix.product_info.rating}
                    withBackground={false}
                  />
                  <figure>
                    <ShareIcon />
                  </figure>
                </RatingArea>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </LayoutProductHeader>
      <Container>
        <Box sx={{ width: "100%", marginBottom: 2 }}>
          <Grid container rowSpacing={4} spacing={4}>
            <Grid item xs={12} sm={6} md={8}>
              <LayoutProductCard>
                <H3
                  fontColor={({ theme }) => theme.colors.text_4}
                  fontWeight={600}
                  fontSize={21}
                  lineHeight={36}
                  xsFontSize={21}
                  xsLineHeight={36}
                  margin={"0 0 20px 0"}
                >
                  Photos
                </H3>
                <ImageGallery
                  items={images}
                  showIndex={true}
                  showPlayButton={false}
                  slideOnThumbnailOver={true}
                />
              </LayoutProductCard>
              <LayoutProductCard>
                <H3
                  fontColor={({ theme }) => theme.colors.text_4}
                  fontWeight={600}
                  fontSize={21}
                  lineHeight={36}
                  xsFontSize={21}
                  xsLineHeight={36}
                  margin={"0 0 20px 0"}
                >
                  Featured Video
                </H3>
                <YoutubeIframe url={productPrefix.product_info.featureVideo} />
              </LayoutProductCard>
              <LayoutProductCard>
                <H3
                  fontColor={({ theme }) => theme.colors.text_4}
                  fontWeight={600}
                  fontSize={21}
                  lineHeight={36}
                  xsFontSize={21}
                  xsLineHeight={36}
                  margin={0}
                >
                  Description
                </H3>
                <ContentBody
                  dangerouslySetInnerHTML={{
                    __html: productPrefix.product_info.description,
                  }}
                />
              </LayoutProductCard>
              <LayoutProductCard>
                <H3
                  fontColor={({ theme }) => theme.colors.text_4}
                  fontWeight={600}
                  fontSize={21}
                  lineHeight={36}
                  xsFontSize={21}
                  xsLineHeight={36}
                  margin={0}
                >
                  Specifications
                </H3>
                <ContentBody
                  dangerouslySetInnerHTML={{
                    __html: productPrefix.product_info.specifications,
                  }}
                />
              </LayoutProductCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <LinkedIconsList
                isPrimaryTitle={true}
                title={"Offers available"}
              />
              <LinkedIconsList isPrimaryTitle={false} title={"Reviews"} />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
