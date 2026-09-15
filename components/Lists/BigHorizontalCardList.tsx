/* eslint-disable camelcase */
import BigHorizontalCard from "components/Cards/BigHorizontalCard";

/**
 * Component that renders a list of Big Horizontal Cards.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code with a list of Big Horizontal Cards.
 */
export default function BigHorizontalCardList(props) {
  return props.postList.map(
    ({ title, excerpt, slug, categories, date, featuredImage }) => {
      const category = categories?.nodes?.[0];
      if (!slug || !category) {
        return null;
      }

      return (
        <BigHorizontalCard
          key={slug}
          className="mb-7.5"
          cardImage={featuredImage?.node?.sourceUrl || "/images/home-art.png"}
          cardSection={`news`}
          cardCategory={category.name}
          cardCategorySlug={category.slug}
          cardTitle={title}
          cardSlug={slug}
          cardExcerpt={excerpt}
          date={date}
        />
      );
    }
  );
}
