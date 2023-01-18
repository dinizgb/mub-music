/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";
import ProductCard from "components/Cards/ProductCard";
import { Span } from "components/Texts/Typographies";

const ProductCardGrid = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

/**
 * Component that renders a list of Big Horizontal Cards.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code with a list of Big Horizontal Cards.
 */
export default function ProductCardList(props: any) {
  return (
    <ProductCardGrid>
      {props.productList.length == 0 ? (
        <Span
          fontColor={({ theme }) => theme.colors.text_3}
          fontWeight={600}
          fontSize={18}
          lineHeight={24}
          xsFontSize={18}
          xsLineHeight={24}
          margin={`30px 0 0 25px`}
        >
          Sorry, no data available.
        </Span>
      ) : (
        props.productList.map(({ title, slug, product_info }) => {
          return (
            <>
              <ProductCard
                cardTitle={title}
                cardImage={product_info.thumbnail.sourceUrl}
                cardBrandLogo={
                  product_info.brand.brand_info.thumbnail.sourceUrl
                }
                cardBrandLogoBgColor={
                  product_info.brand.brand_info.backgroundColor
                }
                cardLink={`/products/${product_info.category.slug}/${product_info.subcategory.slug}/${slug}`}
                cardRating={product_info.rating}
                cardPrice={product_info.price}
                margin={0}
              />
            </>
          );
        })
      )}
    </ProductCardGrid>
  );
}
