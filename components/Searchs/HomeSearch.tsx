import React from "react";
import styled from "styled-components";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { H2, P } from "components/Texts/Typographies";

const HomeSearchWrapper = styled.div`
  background-image: url(/images/home-art.png);
  height: 70vh;
  margin-top: 20px;
  padding: 60px 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-top: 50px;
  }
`;

/**
 * HomeSearch Component.
 * @return {TSX.Element}: The TSX code for the HomeSearch Component.
 */
export default function HomeSearch() {
  return (
    <HomeSearchWrapper>
      <Container maxWidth="xl">
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={12} md={9}>
              <P
                fontColor={({ theme }) => theme.colors.primary}
                fontWeight={600}
                fontSize={21}
                lineHeight={36}
                xsFontSize={21}
                xsLineHeight={36}
                margin={"0 0 20px 0"}
              >
                &#119062;&#119062;&#119062;&#119062;&#119062;&#119062;&#119062;&#119062;&#119062;&#11044;&nbsp;&nbsp;Find
                your Sound &nbsp;&#119136;
              </P>
              <H2
                fontColor={({ theme }) => theme.colors.text_4}
                fontWeight={600}
                fontSize={42}
                lineHeight={64}
                xsFontSize={42}
                xsLineHeight={64}
                margin={0}
              >
                Reviews, Offers, Specs and much more! Find everything you need
                about any musical product!
              </H2>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </HomeSearchWrapper>
  );
}
