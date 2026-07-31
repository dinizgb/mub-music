import { i18n, t } from "@/i18n";

describe("i18n t helper", () => {
  it("replaces a single placeholder", () => {
    expect(t("Hello {name}", { name: "Mub" })).toBe("Hello Mub");
  });

  it("replaces multiple placeholders", () => {
    expect(t(i18n.products.itemsFound, { count: 12 })).toBe("(12 items found)");
  });

  it("replaces all occurrences of the same key", () => {
    expect(t("{x} and {x}", { x: "A" })).toBe("A and A");
  });
});
