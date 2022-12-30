/* eslint-disable camelcase */
import React from "react";
import ProductCard from "components/Cards/ProductCard";
import Grid from "@mui/material/Grid";
import { Span } from "components/Texts/Typographies";

/**
 * Component that renders a list of Big Horizontal Cards.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code with a list of Big Horizontal Cards.
 */
export default function ProductCardList(props: any) {
  return (
    <Grid
      container
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
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
              <Grid item xs={12} sm={6} md={3} key={slug}>
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
              </Grid>
            </>
          );
        })
      )}
    </Grid>
  );
}
