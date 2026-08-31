import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";
import { i18n } from "@/i18n";
import { getSiteConfig } from "lib/seo/siteConfig";
import "./globals.css";

const { metadataBase } = getSiteConfig();

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: i18n.meta.siteName,
    template: i18n.meta.titleTemplate,
  },
  description: i18n.meta.defaultDescription,
  publisher: i18n.meta.siteName,
  icons: {
    icon: "/images/favicon.ico?w=64",
    shortcut: "/images/favicon.ico?w=64",
  },
};

/**
 * Root App Router layout.
 * @param {{ children: ReactNode }} props Layout children.
 * @return {ReactElement} HTML document shell.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Teko:wght@600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
