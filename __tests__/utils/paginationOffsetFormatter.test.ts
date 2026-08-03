import paginationOffsetFormatter from "utils/paginationOffsetFormatter";

describe("paginationOffsetFormatter", () => {
  it("appends a zero to the page string and parses it as an integer", () => {
    expect(paginationOffsetFormatter("1")).toBe(10);
    expect(paginationOffsetFormatter("2")).toBe(20);
    expect(paginationOffsetFormatter("0")).toBe(0);
  });
});
