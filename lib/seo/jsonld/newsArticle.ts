import { absoluteUrl } from "lib/seo/absoluteUrl";
import { getSiteConfig } from "lib/seo/siteConfig";

export type NewsArticleJsonLdInput = {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  sectionName: string;
  url: string;
};

/**
 * Builds NewsArticle JSON-LD from live article fields.
 * @param {NewsArticleJsonLdInput} input Article SEO fields.
 * @return {Record<string, unknown>} Schema.org NewsArticle.
 */
export function buildNewsArticleJsonLd(
  input: NewsArticleJsonLdInput
): Record<string, unknown> {
  const { siteName } = getSiteConfig();
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    articleSection: input.sectionName,
    mainEntityOfPage: input.url,
    author: {
      "@type": "Person",
      name: input.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl("/"),
    },
    isAccessibleForFree: true,
  };

  if (input.image) {
    schema.image = input.image;
  }

  return schema;
}
