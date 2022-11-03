import { createGlobalStyle } from "styled-components";
import { theme } from "../pages/_app";

const GlobalStyle = createGlobalStyle`
    html, body {
        box-sizing: border-box;
        font-family: 'Barlow', sans-serif;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        background-color: ${() => theme.colors.background};
        color: ${() => theme.colors.text_4};
    }
    body {
        overflow-x: hidden;
    }
    ul,li,ol{
        list-style: none;
    }
    *{
        margin: 0;
        -webkit-transition: 0.25s;
        -moz-transition: 0.25s;
        -o-transition: 0.25s;
        -ms-transition: 0.25s;
        transition: 0.25s;
        &:hover {
            -webkit-transition: 0.2s;
            -moz-transition: 0.2s;
            -o-transition: 0.2s;
            -ms-transition: 0.2s;
            transition: 0.2s;
        }
    }
    a{
        text-decoration: none;
        -webkit-transition: 0.25s;
        -moz-transition: 0.25s;
        -o-transition: 0.25s;
        -ms-transition: 0.25s;
        transition: 0.25s;
        &:hover {
            -webkit-transition: 0.2s;
            -moz-transition: 0.2s;
            -o-transition: 0.2s;
            -ms-transition: 0.2s;
            transition: 0.2s;
        }
    }
    h1 {
        font-family: 'Poppins', sans-serif;
    }
    p, li{
        font-family: 'Lato', sans-serif;
    }
    .desktop-only{
        @media (max-width: 900px){
            display: none;
        }
    }
    .mobile-only{
        @media (max-width: 900px){
            display: block;
        }
    }
`;

export default GlobalStyle;
