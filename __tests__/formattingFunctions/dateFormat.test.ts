import formatDate from "utils/formatDate";

describe("Format Date", () => {
  it("Return a eng-GB date format", () => {
    const enGbRegEx =
      /^([1-9]|([012][0-9])|(3[01]))[\/]([0]{0,1}[1-9]|1[012])[\/]\d\d\d\d - (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/g;
    expect(formatDate("2022-04-18T22:05:04")).toMatch(enGbRegEx);
  });
});
