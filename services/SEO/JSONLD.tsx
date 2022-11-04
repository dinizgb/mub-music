import React from "react";

/**
 * Function to build JSON LD script tag.
 * @param {any} data to the tag.
 * @return {TSX.Element}: With a JSON LD script tag.
 */
export default function JSONLD({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
