import {
  NEWS_LIST_PAGE_SIZE,
  paginationFromSearchParam,
} from "utils/listPagination";

describe("paginationFromSearchParam", () => {
  it("defaults to page 1 and offset 0 when the param is missing", () => {
    expect(paginationFromSearchParam(undefined, NEWS_LIST_PAGE_SIZE)).toEqual({
      currentPage: 1,
      offset: 0,
    });
  });

  it("uses (page - 1) * pageSize as the offset", () => {
    expect(paginationFromSearchParam("1", 5)).toEqual({
      currentPage: 1,
      offset: 0,
    });
    expect(paginationFromSearchParam("2", 5)).toEqual({
      currentPage: 2,
      offset: 5,
    });
    expect(paginationFromSearchParam("3", 5)).toEqual({
      currentPage: 3,
      offset: 10,
    });
  });

  it("falls back to page 1 for invalid values", () => {
    expect(paginationFromSearchParam("abc", 5)).toEqual({
      currentPage: 1,
      offset: 0,
    });
    expect(paginationFromSearchParam("0", 5)).toEqual({
      currentPage: 1,
      offset: 0,
    });
    expect(paginationFromSearchParam("-2", 5)).toEqual({
      currentPage: 1,
      offset: 0,
    });
  });
});
