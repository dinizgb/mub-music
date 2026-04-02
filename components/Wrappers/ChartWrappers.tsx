import styled from "styled-components";

type ChartWrappersProps = {
  margin?: any;
};

export const DefaultChartWrapper = styled.div<ChartWrappersProps>`
  padding: 16px 25px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  margin: ${(props) => props.margin};
`;
