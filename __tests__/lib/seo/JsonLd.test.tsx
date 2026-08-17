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

  it("escapes script-breaking characters from CMS strings", () => {
    const html = renderToStaticMarkup(
      <JsonLd
        data={{
          "@type": "NewsArticle",
          headline: "</script><script>alert(1)</script>",
          note: "line\u2028break",
        }}
      />
    );

    expect(html).not.toContain("</script><script>");
    expect(html).toContain("\\u003c/script>");
    expect(html).toContain("\\u003cscript>");
    expect(html).toContain("\\u2028");
  });
});
