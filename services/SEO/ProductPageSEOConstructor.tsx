import React from "react";
import JSONLD from "services/SEO/JSONLD";
// TYPES
import { ProductType } from "types/productType";

type ProductPageSEOConstructorProps = {
  productData: ProductType;
};

/**
 * Function that returns the required tags for a Product Page SEO.
 * Obs: The <title> tag is out of this constructor because for some reason it only renders on the top level component.
 * @param {any} props in raw format.
 * @return {TSX.Element}: with the required tags for a Product Page SEO.
 */
export default function ProductPageSEOConstructor(
  props: ProductPageSEOConstructorProps
) {
  const productPrefix = props.productData;
  const productObj = {
    categoryName: productPrefix.product_info.category.title,
    categorySlug: productPrefix.product_info.category.slug,
    id: productPrefix.id,
    slug: productPrefix.slug,
    subcategoryName: productPrefix.product_info.subcategory.title,
    subcategorySlug: productPrefix.product_info.subcategory.slug,
    thumbnail: productPrefix.product_info.thumbnail.sourceUrl,
    thumbnailAlt: productPrefix.product_info.thumbnail.sourceUrl,
    title: productPrefix.title,
  };
  const canonical = `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/${productObj.categorySlug}/${productObj.subcategorySlug}/${productPrefix.slug}`;
  return (
    <>
      <meta name="description" content={productObj.title} />
      <meta property="og:type" content="product" />
      <meta
        property="og:title"
        content={productPrefix.title + " | Mub Music"}
        key="title"
      />
      <meta property="og:description" content={productObj.title} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={productObj.thumbnail} />
      <link itemProp="thumbnailUrl" href={productObj.thumbnail} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="200" />
      <meta property="og:image:alt" content={productObj.thumbnailAlt} />
      <meta
        name="twitter:text:title"
        content={productPrefix.title + " | Mub Music"}
      />
      <meta name="twitter:image" content={productObj.thumbnail} />
      <meta name="twitter:image:alt" content={productObj.thumbnailAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="preload" href={productObj.thumbnail} as="image" />
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
              name: "Products",
              item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: productObj.categoryName,
              item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/${productObj.categorySlug}/`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: productObj.subcategoryName,
              item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/${productObj.categorySlug}/${productObj.subcategorySlug}/`,
            },
            {
              "@type": "ListItem",
              position: 5,
              name: productObj.title,
              item: `https://${process.env.NEXT_PUBLIC_ENV_DOMAIN}/products/${productObj.categorySlug}/${productObj.subcategorySlug}/${productObj.slug}/`,
            },
          ],
        }}
      />
      <JSONLD
        data={{
          "@context": "https://schema.org/",
          "@type": "Product",
          name: productObj.title,
          description: productObj.title,
          image: productObj.thumbnail,
          gtin: "83290234", // TODO: CREATE A GTIN FUNCTION
          sku: productObj.id,
          aggregateRating: {
            reviewCount: "52",
            ratingValue: 4.5,
          },
          brand: {
            "@type": "Organization",
            name: "Gibson",
            logo: "https://static.guitarcenter.com/derivates/988_LO_Gibson_2022_1_2022-07-19_154634.jpg",
          },
          review: [
            {
              datePublished: "2022-12-27T22:04:31.572Z",
              "@type": "Review",
              author: {
                "@type": "Person",
                name: "Mike",
              },
              name: "Love this guitar",
              locationCreated: {
                "@type": "AdministrativeArea",
                name: "Clarksville, Maryland",
              },
              reviewBody:
                "Very nice guitar with an unending list of tonal options",
              reviewRating: {
                "@type": "Rating",
                ratingValue: 5,
              },
            },
          ],
          offers: {
            priceCurrency: "USD",
            "@type": "AggregateOffer",
            offers: [
              {
                priceCurrency: "USD",
                "@type": "Offer",
                price: "2399.0",
                availability: "InStock",
                url: "https://www.guitarcenter.com/Gibson/Les-Paul-Traditional-Pro-V-Satin-Electric-Guitar-Satin-Iced-Tea-1500000302771.gc",
                itemCondition: "http://schema.org/NewCondition",
              },
            ],
          },
        }}
      />
    </>
  );
}
