/* eslint-disable camelcase */
import React from "react";
import BigHorizontalCard from "components/Cards/BigHorizontalCard";

/**
 * Component that renders a list of Big Horizontal Cards.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code with a list of Big Horizontal Cards.
 */
export default function BigHorizontalCardList(props) {
  return props.postList.map(
    ({ title, excerpt, slug, categories, date, featuredImage }) => {
      return (
        <BigHorizontalCard
          key={slug}
          cardImage={featuredImage.node.sourceUrl}
          cardSection={`news`}
          cardCategory={categories.nodes[0].name}
          cardCategorySlug={categories.nodes[0].slug}
          cardTitle={title}
          cardSlug={slug}
          cardExcerpt={excerpt}
          date={date}
          margin={`0 0 30px 0`}
        />
      );
    }
  );
}
