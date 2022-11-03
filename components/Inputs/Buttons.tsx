import styled from "styled-components";

type ButtonProps = {
  width: string;
  fontSize?: number;
  padding?: string;
  margin?: string;
};

export const PrimaryButton = styled.a<ButtonProps>`
  width: ${(props) => props.width};
  color: ${({ theme }) => theme.colors.text_4};
  font-size: ${(props) => props.fontSize}px;
  font-weight: 600;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  text-align: center;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.text_4};
    color: ${({ theme }) => theme.colors.text_1};
  }
`;

export const WhiteButton = styled.a<ButtonProps>`
  width: ${(props) => props.width};
  color: ${({ theme }) => theme.colors.text_4};
  font-size: 21px;
  font-weight: 600;
  padding: 15px 0;
  margin: ${(props) => props.margin};
  border: 3px solid ${({ theme }) => theme.colors.text_4};
  text-align: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.text_4};
    color: ${({ theme }) => theme.colors.text_1};
  }
`;
