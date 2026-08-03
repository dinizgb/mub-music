import getUrlParameterValue from "utils/getUrlParameterValue";

describe("getUrlParameterValue", () => {
  it("returns the value of an existing query parameter", () => {
    expect(
      getUrlParameterValue("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "v")
    ).toBe("dQw4w9WgXcQ");
  });

  it("returns null when the parameter is missing", () => {
    expect(
      getUrlParameterValue("https://example.com/?foo=bar", "v")
    ).toBeNull();
  });

  it("returns the matching parameter among multiple params", () => {
    expect(
      getUrlParameterValue("https://example.com/?foo=1&bar=2&baz=3", "bar")
    ).toBe("2");
  });

  it("returns null when the URL has no query string", () => {
    expect(
      getUrlParameterValue("https://youtu.be/dQw4w9WgXcQ", "v")
    ).toBeNull();
  });

  it("returns null for an empty URL", () => {
    expect(getUrlParameterValue("", "v")).toBeNull();
  });
});
