import { paginateConnection } from "lib/seo/paginateConnection";

describe("paginateConnection", () => {
  it("walks first/after cursors until hasNextPage is false", async () => {
    const pages = [
      { nodes: ["a", "b"], hasNextPage: true, endCursor: "c1" },
      { nodes: ["c"], hasNextPage: false, endCursor: "c2" },
    ];
    const cursors: Array<string | null> = [];
    let calls = 0;

    const nodes = await paginateConnection(async (pageSize, after) => {
      expect(pageSize).toBe(2);
      cursors.push(after);
      const page = pages[calls];
      calls += 1;
      return page;
    }, 2);

    expect(nodes).toEqual(["a", "b", "c"]);
    expect(cursors).toEqual([null, "c1"]);
    expect(calls).toBe(2);
  });

  it("stops at maxPages even when hasNextPage stays true", async () => {
    const nodes = await paginateConnection(
      async () => ({
        nodes: ["x"],
        hasNextPage: true,
        endCursor: "next",
      }),
      1,
      3
    );
    expect(nodes).toEqual(["x", "x", "x"]);
  });
});
