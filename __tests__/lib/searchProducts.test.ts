import { fetchSearchProducts } from "@/lib/api/searchProducts";

describe("fetchSearchProducts", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("requests the search API with a trailing slash and returns products", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ products: [{ slug: "strat" }] }),
    }) as unknown as typeof fetch;

    await expect(fetchSearchProducts("strat")).resolves.toEqual([
      { slug: "strat" },
    ]);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/search/products/?q=strat",
      undefined
    );
  });

  it("passes an AbortSignal through to fetch", async () => {
    const controller = new AbortController();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ products: [] }),
    }) as unknown as typeof fetch;

    await fetchSearchProducts("strat", controller.signal);

    expect(global.fetch).toHaveBeenCalledWith("/api/search/products/?q=strat", {
      signal: controller.signal,
    });
  });

  it("returns an empty array when the response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Invalid search query" }),
    }) as unknown as typeof fetch;

    await expect(fetchSearchProducts("")).resolves.toEqual([]);
  });

  it("returns an empty array when products is not an array", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ products: null }),
    }) as unknown as typeof fetch;

    await expect(fetchSearchProducts("strat")).resolves.toEqual([]);
  });
});
