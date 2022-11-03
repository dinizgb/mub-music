import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Image from "next/image";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Nav from "./Nav";
import { H1 } from "../Texts/Typographies";

const HeaderContainer = styled.header`
  padding: 16px 0 11px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 2;
  position: relative;
`;

/**
 * Header Component.
 * @return {TSX.Element}: The TSX code for the Header Component.
 */
export default function Header() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width-device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mubmusic.com/" />
        <meta property="og:site_name" content="datamundy" />
        <meta property="og:image" content="images/favicon-1.ico?w=64" />
        <meta property="og:locale" content="en" />
        <link
          rel="shortcut icon"
          href="/images/favicon.ico?w=64"
          type="image/x-icon"
        />
      </Head>
      <HeaderContainer>
        <Container maxWidth="xl">
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6} sm={6} md={3}>
                <a href="/" title="Home">
                  <H1
                    fontColor={({ theme }) => theme.colors.text_4}
                    fontWeight={400}
                    fontSize={28}
                    lineHeight={28}
                    margin={0}
                  >
                    <Image
                      src={"/images/mub-logo-icon.png"}
                      alt={"Mub Music Logo"}
                      width={`31px`}
                      height={`35px`}
                    />
                  </H1>
                </a>
              </Grid>
              <Grid item xs={6} sm={6} md={9}>
                <Nav />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </HeaderContainer>
    </>
  );
}
