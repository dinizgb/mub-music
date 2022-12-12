/* eslint-disable camelcase */
import React from "react";
import ProductCard from "components/Cards/ProductCard";
import Grid from "@mui/material/Grid";

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
      {props.productList.length == 0
        ? `No data available :( . Try again later. `
        : props.productList.map(({ title, slug, product_info }) => {
            return (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <ProductCard
                    key={slug}
                    cardTitle={title}
                    cardImage={product_info.backgroundImage.sourceUrl}
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
          })}
    </Grid>
  );
}
