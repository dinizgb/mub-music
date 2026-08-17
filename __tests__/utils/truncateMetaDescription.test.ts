import truncateMetaDescription from "utils/truncateMetaDescription";

describe("truncateMetaDescription", () => {
  it("returns text through the first period when under 155 chars", () => {
    expect(
      truncateMetaDescription(
        "A classic guitar. More details that should be dropped."
      )
    ).toBe("A classic guitar.");
  });

  it("returns the full text when there is no period and length is under 155", () => {
    expect(truncateMetaDescription("Short product blurb without a stop")).toBe(
      "Short product blurb without a stop"
    );
  });

  it("cuts at 152 and appends ellipsis when the first period is after 155", () => {
    const before = "a".repeat(155);
    const input = `${before}. trailing sentence that is ignored`;
    const result = truncateMetaDescription(input);
    expect(result).toHaveLength(155);
    expect(result).toBe(`${"a".repeat(152)}...`);
  });

  it("cuts at 152 and appends ellipsis when there is no period and text is long", () => {
    const input = "b".repeat(200);
    expect(truncateMetaDescription(input)).toBe(`${"b".repeat(152)}...`);
  });

  it("trims surrounding whitespace before truncating", () => {
    expect(truncateMetaDescription("  Hello world. Extra.  ")).toBe(
      "Hello world."
    );
  });

  it("returns an empty string for blank input", () => {
    expect(truncateMetaDescription("")).toBe("");
    expect(truncateMetaDescription("   ")).toBe("");
  });
});
