/* eslint-disable camelcase */
import React from "react";
import BigHorizontalCard from "components/Cards/BigHorizontalCard";

/**
 * Function that maps News for Big Horizontal Card List.
 * @param {string} newsData in raw format.
 * @return {void}: with mapped data.
 */
export default function bigHorizontalCardListNewsMap(newsData: any) {
  return newsData.map(
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
