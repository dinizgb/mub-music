/* eslint-disable camelcase */
import ProductCard from "components/Cards/ProductCard";
import { Span } from "components/Texts/Typographies";

/**
 * Component that renders a list of Big Horizontal Cards.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code with a list of Big Horizontal Cards.
 */
export default function ProductCardList(props: any) {
  return (
    <div
      className="mx-auto grid auto-rows-fr grid-cols-4 gap-x-7.5 gap-y-7.5
        max-sm:grid-cols-3 max-xs:grid-cols-2 max-[450px]:grid-cols-1"
    >
      {props.productList.length == 0 ? (
        <Span
          className="mt-7.5 ml-6.25 text-text-3"
          fontWeight={600}
          fontSize={18}
          lineHeight={24}
          xsFontSize={18}
          xsLineHeight={24}
        >
          Sorry, no data available.
        </Span>
      ) : (
        props.productList.map(({ title, slug, product_info }) => {
          return (
            <ProductCard
              cardTitle={title}
              cardImage={product_info.thumbnail.sourceUrl}
              cardBrandLogo={product_info.brand.brand_info.thumbnail.sourceUrl}
              cardBrandLogoBgColor={
                product_info.brand.brand_info.backgroundColor
              }
              cardLink={`/products/${product_info.category.slug}/${product_info.subcategory.slug}/${slug}`}
              cardRating={product_info.rating}
              cardPrice={product_info.price}
              key={slug}
            />
          );
        })
      )}
    </div>
  );
}
