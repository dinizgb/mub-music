import getProductLdJson from "utils/getProductLdJson";

describe("getProductLdJson", () => {
  it("extracts Product LD+JSON scripts from HTML", () => {
    const html = `
      <script type="application/ld+json">
        {"@type":"Product","name":"Guitar"}
      </script>
      <script type="application/ld+json">
        {"@type":"Article","name":"News"}
      </script>
    `;

    expect(getProductLdJson(html)).toEqual([
      { "@type": "Product", name: "Guitar" },
    ]);
  });

  it("returns an empty array when no Product scripts exist", () => {
    const html = `
      <script type="application/ld+json">
        {"@type":"Article","name":"News"}
      </script>
    `;

    expect(getProductLdJson(html)).toEqual([]);
  });
});
