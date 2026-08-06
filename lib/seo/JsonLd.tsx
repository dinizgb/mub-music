/**
 * Renders a JSON-LD script tag for structured data.
 * @param {object} props Component props.
 * @param {Record<string, unknown> | Record<string, unknown>[]} props.data Schema payload.
 * @return {JSX.Element} Script element.
 */
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
