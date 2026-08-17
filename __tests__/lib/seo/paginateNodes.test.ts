import { paginateNodes } from "lib/seo/paginateNodes";

describe("paginateNodes", () => {
  it("fetches every page until a short page", async () => {
    const pages = [["a", "b"], ["c", "d"], ["e"]];
    let calls = 0;

    const nodes = await paginateNodes(async (pageSize, offset) => {
      expect(pageSize).toBe(2);
      const page = pages[calls] ?? [];
      calls += 1;
      expect(offset).toBe((calls - 1) * 2);
      return page;
    }, 2);

    expect(nodes).toEqual(["a", "b", "c", "d", "e"]);
    expect(calls).toBe(3);
  });

  it("stops at maxPages to avoid infinite loops", async () => {
    const nodes = await paginateNodes(async () => ["x", "y"], 2, 3);
    expect(nodes).toEqual(["x", "y", "x", "y", "x", "y"]);
  });
});
