import separateDecimalNumber from "utils/separateDecimalNumber";

describe("separateDecimalNumber", () => {
  it("returns the integer part when position is 0", () => {
    expect(separateDecimalNumber(4.5, 0)).toBe(4);
  });

  it("returns the decimal part when position is 1", () => {
    expect(separateDecimalNumber(4.5, 1)).toBe(5);
  });
});
