import { buildHomeStats } from "utils/homeStats";

describe("buildHomeStats", () => {
  it("uses two offers and three reviews for each product", () => {
    expect(buildHomeStats(12)).toEqual({
      products: 12,
      offers: 24,
      reviews: 36,
    });
  });

  it("treats a missing or negative product count as zero", () => {
    expect(buildHomeStats(0)).toEqual({
      products: 0,
      offers: 0,
      reviews: 0,
    });
    expect(buildHomeStats(-4)).toEqual({
      products: 0,
      offers: 0,
      reviews: 0,
    });
  });
});
