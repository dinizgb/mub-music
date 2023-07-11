/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";
// TYPES
import { ProductsCategoriesType } from "types/productsCategoriesType";

const MenuContainer = styled.div<MobileMenuContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 270px;
  height: 100%;
  z-index: 26;
  background-color: ${({ theme }) => theme.colors.background};
  display: ${(props) => props.display};
  flex-direction: column;
  overflow-y: hidden;
`;

const ListContainer = styled.div`
  overflow-x: auto;
  height: 100%;
  margin-right: 22px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 20px !important;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MenuBlock = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
  margin-right: 5px;
  padding: 12px 28px 22px 0;
`;

const MenuTitle = styled.span`
  font-family: "Poppins", serif;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 3px solid;
  padding: 8px 0;
  margin-left: 40px;
  color: ${({ theme }) => theme.colors.text_4};
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 15px;
`;

const MenuItem = styled.li`
  margin: 10px 0;
  a {
    background: ${({ theme }) => theme.colors.background_contrast};
    border-radius: 50px;
    color: ${({ theme }) => theme.colors.text_2};
    font-size: 16px;
    font-weight: 400;
    text-decoration: none;
    padding: 8px 20px 10px 20px;
    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.text_1};
    }
  }
`;

type MobileMenuContainerProps = {
  display: string;
};

type MobileMenuProps = {
  display: string;
  productsCategories: ProductsCategoriesType[];
};

/**
 * Mobile Menu Component.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code for the Mobile Menu Component.
 */
export default function MobileMenu(props: MobileMenuProps) {
  return (
    <>
      <MenuContainer display={props.display}>
        <ListContainer>
          <MenuBlock>
            <MenuTitle>Products</MenuTitle>
            <MenuList>
              {props.productsCategories.map(({ slug, title }) => {
                return (
                  <MenuItem key={slug}>
                    <a href={`/products/${slug}`}>{title}</a>
                  </MenuItem>
                );
              })}
            </MenuList>
          </MenuBlock>
          <MenuBlock>
            <MenuTitle>News</MenuTitle>
            <MenuList>
              <MenuItem>
                <a href={`/news/awards`}>Awards</a>
              </MenuItem>
              <MenuItem>
                <a href={`/news/music-business`}>Music Business</a>
              </MenuItem>
              <MenuItem>
                <a href={`/news/people`}>People</a>
              </MenuItem>
              <MenuItem>
                <a href={`/news/releases`}>Releases</a>
              </MenuItem>
            </MenuList>
          </MenuBlock>
        </ListContainer>
      </MenuContainer>
    </>
  );
}
