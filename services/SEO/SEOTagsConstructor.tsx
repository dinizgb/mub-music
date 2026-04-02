import React from "react";
import JSONLD from "services/SEO/JSONLD";
import { SEOTagsConstructorTypes } from "types/SEOTagsConstructorTypes";

/**
 * Function that returns the required tags for Page SEO.
 * Obs: The <title> tag and 'canonical' link are out of this constructor because for some reason it only renders on the top level component.
 * @param {any} props in raw format.
 * @return {TSX.Element}: with the required tags for Page SEO.
 */
export default function SEOTagsConstructor(props: SEOTagsConstructorTypes) {
  return (
    <>
      <meta name="description" content={props.pageExcerpt} />
      <meta property="og:type" content={props.pageType} />
      <meta
        property="og:title"
        content={props.pageTitle + " | Mub Music"}
        key="title"
      />
      <meta property="og:description" content={props.pageExcerpt} />
      <meta
        property="og:url"
        content={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/${props.pagePath}/`}
      />
      <meta
        property="og:image"
        content={
          props.pageThumb
            ? props.pageThumb
            : `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/images/mub-avatar.jpg`
        }
      />
      <link
        itemProp="thumbnailUrl"
        href={
          props.pageThumb
            ? props.pageThumb
            : `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/images/mub-avatar.jpg`
        }
      />
      {props.pageThumb ? (
        props.pageThumb
      ) : (
        <link rel="preload" href={props.pageThumb} as="image" />
      )}
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="200" />
      <meta property="og:image:alt" content={props.pageExcerpt} />
      <meta
        name="twitter:text:title"
        content={props.pageTitle + " | Mub Music"}
      />
      <meta
        name="twitter:image"
        content={
          props.pageThumb
            ? props.pageThumb
            : `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/images/mub-avatar.jpg`
        }
      />
      <meta name="twitter:image:alt" content={props.pageExcerpt} />
      <meta name="twitter:card" content="summary_large_image" />
      <link
        rel="canonical"
        href={`https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/${props.pagePath}/`}
      />
      <JSONLD
        data={{
          "@context": "https://schema.org/",
          "@type": "BreadcrumbList",
          itemListElement: [props.breadcrumbItemListElement],
        }}
      />
    </>
  );
}
