import { i18n } from "@/i18n";

export type SiteConfig = {
  siteName: string;
  domain: string;
  metadataBase: URL;
};

/**
 * Returns site SEO config from env. Throws if domain is missing.
 * @return {SiteConfig} Site name, domain, and metadataBase URL.
 */
export function getSiteConfig(): SiteConfig {
  const domain = process.env.NEXT_PUBLIC_ENV_DOMAIN?.trim();
  if (!domain) {
    throw new Error(
      "NEXT_PUBLIC_ENV_DOMAIN is required for SEO URLs (canonical, Open Graph, sitemaps)."
    );
  }
  return {
    siteName: i18n.meta.siteName,
    domain,
    metadataBase: new URL(`https://${domain}`),
  };
}
