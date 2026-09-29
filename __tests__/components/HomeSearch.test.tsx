import { render, screen } from "@testing-library/react";
import HomeSearch from "components/Searches/HomeSearch";
import { i18n } from "@/i18n";

jest.mock("components/Inputs/SearchInput", () => ({
  __esModule: true,
  default: () => <div data-testid="search-input" />,
}));

describe("HomeSearch", () => {
  it("renders product, offer, and review counts from stats", () => {
    render(
      <HomeSearch
        stats={{
          products: 12,
          offers: 24,
          reviews: 36,
        }}
      />
    );

    expect(screen.getByText("12+")).toBeInTheDocument();
    expect(screen.getByText("24+")).toBeInTheDocument();
    expect(screen.getByText("36+")).toBeInTheDocument();
    expect(screen.getByText(i18n.home.statsProducts)).toBeInTheDocument();
    expect(screen.getByText(i18n.home.statsOffers)).toBeInTheDocument();
    expect(screen.getByText(i18n.home.statsReviews)).toBeInTheDocument();
  });
});
