import styled from "styled-components";

export const ContentBody = styled.div`
  p,
  div {
    padding-top: 24px;
    padding-bottom: 16px;
    line-height: 36px;
    font-size: 17px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text_3};
    iframe {
      display: flex;
      align-items: center;
      margin: 0 auto;
      max-width: 100%;
    }
    div {
      margin: 0 auto;
      max-width: 100%;
    }
    img {
      display: flex;
      align-items: center;
      margin: 0 auto;
      max-width: 100%;
    }
  }
  span {
    line-height: 28px;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.text_2};
  }
  ul {
    list-style-type: disc;
    padding-left: 50px;
    padding-top: 24px;
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    text-decoration: underline;
  }
  hr {
    margin-top: 24px;
  }
  h2 {
    font-size: 28px;
    font-weight: bold;
    padding-top: 24px;
    color: ${({ theme }) => theme.colors.text_4};
  }
  h3 {
    font-size: 24px;
    font-weight: bold;
    padding-top: 24px;
    color: ${({ theme }) => theme.colors.text_4};
  }
  .widget-news-list {
    list-style-type: none;
    padding: 0px;
  }
  strong {
    font-weight: bold;
  }
  blockquote {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto !important;
    padding: 0 0 0 30px;
    font-style: italic;
    border-left: 5px solid ${({ theme }) => theme.colors.primary};
  }
  .widget-news {
    a {
      text-decoration: none;
      h3 {
        font: normal normal 800 18px/28px "Poppins";
        padding: 0;
      }
    }
  }
  figure {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .aligncenter,
  .alignleft,
  .alignright,
  .size-full,
  .size-large {
    width: 100% !important;
    height: auto;
    margin: 0 auto !important;
    padding-top: 24px;
    text-align: center;
  }
  .wp-caption-text {
    margin: 0;
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-weight: 400;
    font-size: 15px;
    line-height: 26px;
    color: ${({ theme }) => theme.colors.text_3};
  }
  .quote-box {
    overflow: hidden;
    margin: 30px -15px;
    padding: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  .quote-box p {
    font-size: 26px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: -0.6px;
    color: #000;
    padding: 0;
  }
  .item-share-list {
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
    a {
      padding: 4px;
    }
  }
  .widget-box {
    position: relative;
    &::before {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 75px;
      height: 5px;
      background: ${({ theme }) => theme.colors.primary};
      margin-top: 10px;
    }
  }
  b {
    font-weight: bold;
  }
`;
