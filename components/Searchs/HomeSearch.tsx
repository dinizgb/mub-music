import styled from "styled-components";

// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// COMPONENTS
import { H2, H3, Span, P } from "components/Texts/Typographies";
import SearchInput from "components/Inputs/SearchInput";

const HomeSearchWrapper = styled.div`
  background-image: url(/images/home-art.png);
  background-position: 150px 50%;
  background-repeat: no-repeat;
  height: 70vh;
  margin-top: 20px;
  padding: 60px 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-top: 50px;
  }
`;

const TotalNumbersArea = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 0 0;
  div {
    border-right: 1px solid ${({ theme }) => theme.colors.text_1};
    padding: 30px 40px;
    text-align: center;
    &:last-child {
      border-right: none;
    }
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
            <Grid item xs={12} sm={12} md={7}>
              <P
                fontColor={({ theme }) => theme.colors.primary}
                fontWeight={600}
                fontSize={24}
                lineHeight={48}
                xsFontSize={24}
                xsLineHeight={48}
                margin={"0 0 20px 0"}
              >
                &#119062;&#119062;&#119062;&#119062;&#119062;&#119062;&#11044;&nbsp;&nbsp;Find
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
              <SearchInput
                margin={"40px 0 0 0"}
                placeholder="Type your musical wish here :)"
              />
              <TotalNumbersArea>
                <div>
                  <H3
                    fontColor={({ theme }) => theme.colors.text_4}
                    fontWeight={600}
                    fontSize={21}
                    lineHeight={30}
                    xsFontSize={21}
                    xsLineHeight={30}
                    margin={0}
                  >
                    1000k+
                  </H3>
                  <Span
                    fontColor={({ theme }) => theme.colors.subtitle}
                    fontWeight={600}
                    fontSize={18}
                    lineHeight={30}
                    xsFontSize={18}
                    xsLineHeight={30}
                    margin={"0 0 20px 0"}
                  >
                    Products
                  </Span>
                </div>
                <div>
                  <H3
                    fontColor={({ theme }) => theme.colors.text_4}
                    fontWeight={600}
                    fontSize={21}
                    lineHeight={30}
                    xsFontSize={21}
                    xsLineHeight={30}
                    margin={0}
                  >
                    1000k+
                  </H3>
                  <Span
                    fontColor={({ theme }) => theme.colors.subtitle}
                    fontWeight={600}
                    fontSize={18}
                    lineHeight={30}
                    xsFontSize={18}
                    xsLineHeight={30}
                    margin={"0 0 20px 0"}
                  >
                    Reviews
                  </Span>
                </div>
                <div>
                  <H3
                    fontColor={({ theme }) => theme.colors.text_4}
                    fontWeight={600}
                    fontSize={21}
                    lineHeight={30}
                    xsFontSize={21}
                    xsLineHeight={30}
                    margin={0}
                  >
                    1000k+
                  </H3>
                  <Span
                    fontColor={({ theme }) => theme.colors.subtitle}
                    fontWeight={600}
                    fontSize={18}
                    lineHeight={30}
                    xsFontSize={18}
                    xsLineHeight={30}
                    margin={"0 0 20px 0"}
                  >
                    Offers
                  </Span>
                </div>
              </TotalNumbersArea>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </HomeSearchWrapper>
  );
}
