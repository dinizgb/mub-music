import { renderToStaticMarkup } from "react-dom/server";
import JsonLd from "lib/seo/JsonLd";

describe("JsonLd", () => {
  it("renders an application/ld+json script", () => {
    const html = renderToStaticMarkup(
      <JsonLd data={{ "@type": "Organization", name: "Mub Music" }} />
    );
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('"@type":"Organization"');
    expect(html).toContain('"name":"Mub Music"');
  });
});
