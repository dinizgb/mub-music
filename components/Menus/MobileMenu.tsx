/* eslint-disable camelcase */
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
  position: relative;
`;

const MenuTitle = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text_4};
  font-family: "Poppins", serif;
  font-size: 18px;
  font-weight: bold;
  padding: 18px 10% 20px 10%;
  width: 80%;
`;

const MenuList = styled.ul`
  align-items: start;
  border: none;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const MenuItem = styled.li`
  display: contents;
  a {
    background: ${({ theme }) => theme.colors.black};
    border-bottom: 2px solid ${({ theme }) => theme.colors.background_contrast};
    color: ${({ theme }) => theme.colors.text_3};
    font-size: 16px;
    font-weight: 400;
    text-decoration: none;
    padding: 15px 10%;
    width: 80%;
    &:hover {
      background: ${({ theme }) => theme.colors.allBlack};
      color: ${({ theme }) => theme.colors.text_4};
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
