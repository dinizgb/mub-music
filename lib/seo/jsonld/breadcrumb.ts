export type BreadcrumbItem = {
  name: string;
  item: string;
};

/**
 * Builds a BreadcrumbList JSON-LD object.
 * @param {BreadcrumbItem[]} items Ordered breadcrumb entries.
 * @return {Record<string, unknown>} Schema.org BreadcrumbList.
 */
export function buildBreadcrumbJsonLd(
  items: BreadcrumbItem[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}
