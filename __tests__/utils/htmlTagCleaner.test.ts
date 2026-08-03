import htmlTagCleaner from "utils/htmlTagCleaner";

const htmlTextExample =
  "<p>Sample <strong>HTML tags</strong> cleaning test. The <em>goal here</em> is to clean this text from the <small>HTML tags</small>.</p>\n";

const expectedHtmlText =
  "Sample HTML tags cleaning test. The goal here is to clean this text from the HTML tags.";

describe("Cleans HTML tags", () => {
  it("The function should remove all HTML tags from the example text", () => {
    expect(htmlTagCleaner(htmlTextExample).trim()).toBe(
      expectedHtmlText.trim()
    );
  });
});
