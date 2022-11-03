import React from "react";
import JSONLD from "services/SEO/JSONLD";

type SinglePageSEOConstructorProps = {
  singlePageTitle: string;
  singlePageExcerpt: string;
  singlePageSectionName: string;
  singlePageSectionSlug: string;
  singlePageCategoryName?: string;
  singlePageCategorySlug?: string;
  singlePageSlug?: string;
  singlePageDate: string;
  singlePageModifiedDate: string;
  singlePageFeaturedImage: string;
  singlePageAuthor: string;
};

/**
 * Function that returns the required tags for Single Page SEO.
 * Obs: The <title> tag is out of this constructor because for some reason it only renders on the top level component.
 * @param {any} props in raw format.
 * @return {TSX.Element}: with the required tags for Single Page SEO.
 */
export default function SinglePageSEOConstructor(
  props: SinglePageSEOConstructorProps
) {
  const canonical = `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/${
    props.singlePageSectionSlug
  }/${props.singlePageCategorySlug ? props.singlePageCategorySlug + "/" : ""}${
    props.singlePageSlug ? props.singlePageSlug + "/" : ""
  }`;
  return (
    <>
      <meta name="description" content={props.singlePageExcerpt} />
      <meta property="og:type" content="article" />
      <meta
        property="og:title"
        content={props.singlePageTitle + " | Mub Music"}
        key="title"
      />
      <meta property="og:description" content={props.singlePageExcerpt} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={props.singlePageFeaturedImage} />
      <link itemProp="thumbnailUrl" href={props.singlePageFeaturedImage} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="200" />
      <meta property="og:image:alt" content={props.singlePageExcerpt} />
      <meta
        property="article:published_time"
        content={`${new Date(props.singlePageDate).toISOString()}`}
      />
      <meta
        property="article:modified_time"
        content={`${new Date(props.singlePageModifiedDate).toISOString()}`}
      />
      <meta
        name="twitter:text:title"
        content={props.singlePageTitle + " | Exame"}
      />
      <meta name="twitter:image" content={props.singlePageFeaturedImage} />
      <meta name="twitter:image:alt" content={props.singlePageExcerpt} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="preload" href={props.singlePageFeaturedImage} as="image" />
      <link rel="canonical" href={canonical} />
      <JSONLD
        data={{
          "@context": "https://schema.org/",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: props.singlePageSectionName,
              item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/${props.singlePageSectionSlug}/`,
            },
            props.singlePageCategorySlug
              ? {
                  "@type": "ListItem",
                  position: 3,
                  name: props.singlePageCategoryName,
                  item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/${props.singlePageSectionSlug}/${props.singlePageCategorySlug}/`,
                }
              : {},
            props.singlePageSlug
              ? {
                  "@type": "ListItem",
                  position: props.singlePageCategorySlug ? 4 : 3,
                  name: props.singlePageTitle,
                  item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/${
                    props.singlePageSectionSlug
                  }/${
                    props.singlePageCategorySlug
                      ? props.singlePageCategorySlug + "/"
                      : ""
                  }${props.singlePageSlug}/`,
                }
              : {},
          ],
        }}
      />
      <JSONLD
        data={{
          "@context": "https://schema.org/",
          "@type": "NewsArticle",
          headline: props.singlePageTitle,
          alternativeHeadline: props.singlePageExcerpt,
          image: props.singlePageFeaturedImage,
          articleSection: props.singlePageSectionName,
          datePublished: new Date(props.singlePageDate).toISOString(),
          dateModified: new Date(props.singlePageModifiedDate).toISOString(),
          author: [
            {
              "@type": "Person",
              name: props.singlePageAuthor,
              url: "mubmusic.com",
            },
          ],
          publisher: [
            {
              "@type": "Organization",
              name: "mubmusic.com",
            },
          ],
          isPartOf: [
            {
              "@type": ["CreativeWork", "Product"],
              name: "mubmusic.com",
              productID: "mubmusic.com:basic",
            },
          ],
          isAccessibleForFree: "True",
        }}
      />
    </>
  );
}
