import React from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import MobileMenu from "../Menus/MobileMenu";
import { useAppSelector, useAppDispatch } from "redux/store";
import { toggleMobileMenu } from "redux/slices/mobileMenu/";

type NavProps = {
  display: string;
};

const NavContainer = styled.nav`
  float: right;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const NavUl = styled.ul`
  display: flex;
  flex-direction: row;
  @media (max-width: 885px) {
    display: flex;
  }
`;

const NavLi = styled.li`
  display: flex;
  padding: 0 0 0 25px;
  a {
    font-family: "Poppins", serif;
    letter-spacing: 0.5px;
    color: #fff;
    font-weight: 500;
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.colors.primary_hover};
    }
  }
  @media (max-width: 885px) {
    display: none;
  }
`;

const NavLiMobile = styled.li`
  padding: 0 0 0 25px;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary_hover};
  }
`;

const MenuOverlay = styled.div<NavProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 25;
  transition: all 1s ease 0s;
  display: ${(props) => props.display};
`;

/**
 * Nav Component.
 * @return {TSX.Element}: The TSX code for the Nav Component.
 */
export default function Nav() {
  const dispatch = useAppDispatch();
  const mobileMenuStatus = useAppSelector(
    (state) => state.mobileMenuEvents.showMobileMenu
  );
  const handleToggleMobileMenu = () => {
    dispatch(toggleMobileMenu(!mobileMenuStatus ? true : false));
  };

  return (
    <NavContainer>
      <NavUl>
        <NavLi>
          <a href="/news/">News</a>
        </NavLi>
        <NavLiMobile onClick={handleToggleMobileMenu}>
          <MenuIcon />
        </NavLiMobile>
        <MobileMenu display={!mobileMenuStatus ? "none" : "block"} />
        <MenuOverlay
          display={!mobileMenuStatus ? "none" : "block"}
          onClick={handleToggleMobileMenu}
        />
      </NavUl>
    </NavContainer>
  );
}
