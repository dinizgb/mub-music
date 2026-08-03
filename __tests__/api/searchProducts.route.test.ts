import { handleSearchProducts } from "services/search/handleSearchProducts";
import { resetSearchRateLimit } from "services/search/searchRateLimit";

const searchProductsMock = jest.fn();

jest.mock("services/search/searchProducts", () => ({
  searchProducts: (...args: unknown[]) => searchProductsMock(...args),
}));

describe("handleSearchProducts", () => {
  beforeEach(() => {
    searchProductsMock.mockReset();
    resetSearchRateLimit();
  });

  it("returns 400 when q is missing", async () => {
    const result = await handleSearchProducts(null);

    expect(result).toEqual({
      status: 400,
      body: { error: "Invalid search query" },
    });
    expect(searchProductsMock).not.toHaveBeenCalled();
  });

  it("returns 400 when q is only whitespace", async () => {
    const result = await handleSearchProducts("   ");

    expect(result.status).toBe(400);
    expect(searchProductsMock).not.toHaveBeenCalled();
  });

  it("returns 400 when q exceeds the max length", async () => {
    const result = await handleSearchProducts("a".repeat(201));

    expect(result.status).toBe(400);
    expect(searchProductsMock).not.toHaveBeenCalled();
  });

  it("returns product nodes on success", async () => {
    const products = [{ slug: "strat", title: "Strat" }];
    searchProductsMock.mockResolvedValue({
      props: { data: { products: { nodes: products } } },
    });

    const result = await handleSearchProducts("strat");

    expect(searchProductsMock).toHaveBeenCalledWith("strat");
    expect(result).toEqual({
      status: 200,
      body: { products },
    });
  });

  it("returns an empty products list when nodes is missing", async () => {
    searchProductsMock.mockResolvedValue({
      props: { data: { products: { nodes: undefined } } },
    });

    const result = await handleSearchProducts("strat");

    expect(result).toEqual({
      status: 200,
      body: { products: [] },
    });
  });

  it("returns an empty products list when the service reports notFound", async () => {
    searchProductsMock.mockResolvedValue({ notFound: true });

    const result = await handleSearchProducts("missing");

    expect(result).toEqual({
      status: 200,
      body: { products: [] },
    });
  });

  it("returns 500 when the service throws", async () => {
    searchProductsMock.mockRejectedValue(new Error("boom"));

    const result = await handleSearchProducts("strat");

    expect(result).toEqual({
      status: 500,
      body: { error: "Search failed" },
    });
  });

  it("returns 429 when the client exceeds the rate limit", async () => {
    searchProductsMock.mockResolvedValue({
      props: { data: { products: { nodes: [] } } },
    });

    for (let i = 0; i < 10; i++) {
      const allowed = await handleSearchProducts(`query-${i}`, {
        clientKey: "10.0.0.1",
      });
      expect(allowed.status).toBe(200);
    }

    const limited = await handleSearchProducts("query-over", {
      clientKey: "10.0.0.1",
    });

    expect(limited).toEqual({
      status: 429,
      body: { error: "Too many requests" },
    });
    expect(searchProductsMock).toHaveBeenCalledTimes(10);
  });
});
