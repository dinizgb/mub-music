import styled from "styled-components";

type ButtonProps = {
  width?: string;
  fontSize?: number;
  padding?: string;
  margin?: string;
};

export const FilterButton = styled.button<ButtonProps>`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text_1};
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  margin: ${(props) => props.margin};
  padding: 10px 11px;
  text-align: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.text_1};
    border: 1px solid ${({ theme }) => theme.colors.text_1};
    color: ${({ theme }) => theme.colors.text_4};
  }
`;

export const PrimaryButton = styled.a<ButtonProps>`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text_4};
  font-size: ${(props) => props.fontSize}px;
  font-weight: 600;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  text-align: center;
  width: ${(props) => props.width};
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
