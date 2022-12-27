import React from "react";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import separateDecimalNumber from "utils/separateDecimalNumber";

const StarsWidgetWrapper = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 4px 8px 0px 8px;
  border-radius: 50px;
  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 18px;
  }
`;

type StarsConstructorProps = {
  number: number;
};

/**
 * Stars Widget Component.
 * @param {StarsConstructorProps} props to the component.
 * @return {TSX.Element}: The TSX code for the Stars Widget Component.
 */
export default function StarsWidget(props: StarsConstructorProps) {
  let stars = [];
  const firstNumber = separateDecimalNumber(props.number, 0);
  const secondNumber = separateDecimalNumber(props.number, 1);
  const remainingNumber = 5 - firstNumber;

  // First Number Loop
  for (let i = 0; i < firstNumber; i++) {
    stars = [...stars, <StarIcon key={`full-` + i} />];
  }

  // Second Number Loop
  if (firstNumber != 5 && firstNumber != 0) {
    if (secondNumber > 1) {
      if (remainingNumber > 1) {
        stars = [...stars, <StarHalfIcon key={`half-0`} />];
        for (let i = 0; i < remainingNumber - 1; i++) {
          stars = [...stars, <StarOutlineIcon key={`outline-` + i} />];
        }
      } else {
        for (let i = 0; i < remainingNumber; i++) {
          stars = [...stars, <StarHalfIcon key={`half-` + i} />];
        }
      }
    } else {
      for (let i = 0; i < remainingNumber; i++) {
        stars = [...stars, <StarOutlineIcon key={`outline-` + i} />];
      }
    }
  } else if (firstNumber == 0) {
    stars = [
      <StarHalfIcon key={`half-0`} />,
      <StarOutlineIcon key={`outline-1`} />,
      <StarOutlineIcon key={`outline-2`} />,
      <StarOutlineIcon key={`outline-3`} />,
      <StarOutlineIcon key={`outline-4`} />,
    ];
  }

  return (
    <>
      <StarsWidgetWrapper>
        {stars.map((star) => {
          return star;
        })}
      </StarsWidgetWrapper>
    </>
  );
}
