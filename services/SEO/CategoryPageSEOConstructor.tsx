import React from "react";

type CategoryPageSEOConstructorProps = {
  categoryPageTitle: string;
  categoryPageExcerpt: string;
  categoryPageSectionSlug: string;
  categoryPageSlug: string;
};

/**
 * Function that returns the required tags for Category Page SEO.
 * Obs: The <title> tag and 'canonical' link are out of this constructor because for some reason it only renders on the top level component.
 * @param {any} props in raw format.
 * @return {TSX.Element}: with the required tags for Category Page SEO.
 */
export default function CategoryPageSEOConstructor(
  props: CategoryPageSEOConstructorProps
) {
  return (
    <>
      <meta name="description" content={props.categoryPageExcerpt} />
      <meta property="og:type" content="article" />
      <meta
        property="og:title"
        content={props.categoryPageTitle + " | Mub Music"}
        key="title"
      />
      <meta property="og:description" content={props.categoryPageExcerpt} />
      <meta
        property="og:url"
        content={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/${
          props.categoryPageSectionSlug
        }/${props.categoryPageSlug ? props.categoryPageSlug + "/" : ""}`}
      />
      <meta
        property="og:image"
        content={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/images/mub-avatar.jpg`}
      />
      <link
        itemProp="thumbnailUrl"
        href={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/images/mub-avatar.jpg`}
      />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="200" />
      <meta property="og:image:alt" content={props.categoryPageExcerpt} />
      <meta
        name="twitter:text:title"
        content={props.categoryPageTitle + " | Exame"}
      />
      <meta
        name="twitter:image"
        content={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/images/mub-avatar.jpg`}
      />
      <meta name="twitter:image:alt" content={props.categoryPageExcerpt} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
