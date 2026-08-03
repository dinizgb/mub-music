/* eslint-disable camelcase */
import ProductCard from "components/Cards/ProductCard";
import { Span } from "components/Texts/Typographies";
import { i18n } from "@/i18n";

/**
 * Component that renders a list of Big Horizontal Cards.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code with a list of Big Horizontal Cards.
 */
export default function ProductCardList(props: any) {
  return (
    <div
      className="max-xs:grid-cols-2 mx-auto grid auto-rows-fr grid-cols-4
        gap-x-7.5 gap-y-7.5 max-[450px]:grid-cols-1 max-sm:grid-cols-3"
    >
      {props.productList.length == 0 ? (
        <Span
          className="text-text-3 mt-7.5 ml-6.25"
          fontWeight={600}
          fontSize={18}
          lineHeight={24}
          xsFontSize={18}
          xsLineHeight={24}
        >
          {i18n.products.empty}
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
