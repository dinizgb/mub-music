import formatDate from "utils/formatDate";

describe("Format Date", () => {
  it("returns a US date format", () => {
    const enUsRegEx =
      /^(1[0-2]|0?[1-9])\/([12]\d|3[01]|0?[1-9])\/\d{4} - (1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d [AP]M$/;
    expect(formatDate("2022-04-18T22:05:04")).toMatch(enUsRegEx);
  });
});
