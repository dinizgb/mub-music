import sortArrayOfObjects from "utils/sortArrayOfObjects";

describe("sortArrayOfObjects", () => {
  const sample = [
    { name: "Charlie", slug: "c" },
    { name: "Alice", slug: "a" },
    { name: "Bob", slug: "b" },
  ];

  it("sorts by property when toDesc is false", () => {
    const result = sortArrayOfObjects([...sample], "name", false);
    expect(result.map((item) => item.name)).toEqual([
      "Charlie",
      "Bob",
      "Alice",
    ]);
  });

  it("sorts by property when toDesc is true", () => {
    const result = sortArrayOfObjects([...sample], "name", true);
    expect(result.map((item) => item.name)).toEqual([
      "Alice",
      "Bob",
      "Charlie",
    ]);
  });

  it("keeps equal property values in a stable relative order", () => {
    const withDuplicates = [
      { name: "Alice", slug: "a1" },
      { name: "alice", slug: "a2" },
      { name: "Bob", slug: "b" },
    ];

    const result = sortArrayOfObjects(withDuplicates, "name", true);
    expect(result.map((item) => item.slug)).toEqual(["a1", "a2", "b"]);
  });
});
