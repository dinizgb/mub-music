import { searchProducts } from "services/search/searchProducts";

const fetchQueryMock = jest.fn();
const getAllSearchProductsMock = jest.fn();

jest.mock("services/graphql/fetchQuery", () => ({
  fetchQuery: (...args: unknown[]) => fetchQueryMock(...args),
}));

jest.mock("services/graphql/queries/getAllSearchProducts", () => ({
  __esModule: true,
  default: (...args: unknown[]) => getAllSearchProductsMock(...args),
}));

describe("searchProducts", () => {
  beforeEach(() => {
    fetchQueryMock.mockReset();
    getAllSearchProductsMock.mockReset();
  });

  it("queries products with the search text and returns the fetch result", async () => {
    const response = { props: { data: { products: { nodes: [] } } } };
    getAllSearchProductsMock.mockReturnValue("search-query");
    fetchQueryMock.mockResolvedValue(response);

    await expect(searchProducts("strat")).resolves.toEqual(response);

    expect(getAllSearchProductsMock).toHaveBeenCalledWith({
      first: 10,
      where: { search: "strat" },
    });
    expect(fetchQueryMock).toHaveBeenCalledWith("search-query");
  });
});
