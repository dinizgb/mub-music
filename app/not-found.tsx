import type { Metadata } from "next";
import Link from "next/link";
import { i18n } from "@/i18n";

export const metadata: Metadata = {
  title: "Not found",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * App Router not-found page.
 * @return {JSX.Element} 404 content.
 */
export default function NotFound() {
  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-20 text-center">
      <h1 className="text-text-4 mb-4 text-3xl font-semibold">
        Page not found
      </h1>
      <p className="text-subtitle mb-8">
        The page you requested could not be found.
      </p>
      <Link className="text-primary underline" href="/">
        {i18n.header.home}
      </Link>
    </main>
  );
}
