import type { Metadata } from "next";
import { absoluteUrl } from "lib/seo/absoluteUrl";
import { getSiteConfig } from "lib/seo/siteConfig";
import { i18n, t } from "@/i18n";

export type BuildPageMetadataInput = {
  title: string | { absolute: string };
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Builds a consistent Metadata object for App Router pages.
 * @param {BuildPageMetadataInput} input Page SEO fields.
 * @return {Metadata} Next.js metadata.
 */
export function buildPageMetadata(input: BuildPageMetadataInput): Metadata {
  const { siteName } = getSiteConfig();
  const canonical = absoluteUrl(input.path);
  const image = input.image ?? absoluteUrl("/images/home-art.png");
  const ogTitle =
    typeof input.title === "string"
      ? t(i18n.meta.titleSuffix, { title: input.title })
      : input.title.absolute;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: input.type ?? "website",
      title: ogTitle,
      description: input.description,
      url: canonical,
      siteName,
      images: [image],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: input.description,
      images: [image],
    },
  };
}
