import { fetchPaths } from "services/core/fetchPaths";

describe("fetchPaths", () => {
  it("returns the given paths with blocking fallback", async () => {
    const pathsToRender = [
      { params: { category: "guitars" } },
      { params: { category: "drums" } },
    ];

    await expect(fetchPaths(pathsToRender)).resolves.toEqual({
      paths: pathsToRender,
      fallback: "blocking",
    });
  });
});
