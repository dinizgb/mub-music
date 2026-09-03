import { fireEvent, render, screen } from "@testing-library/react";
import ProductCard from "components/Cards/ProductCard";
import { i18n } from "@/i18n";
import { AnalyticsEvents } from "lib/analytics/events";
import { trackEvent } from "lib/analytics/track";

jest.mock("lib/analytics/track", () => ({
  trackEvent: jest.fn(),
}));

const defaultProps = {
  cardTitle: "Fender Stratocaster",
  cardImage: "https://example.com/strat.jpg",
  cardBrandLogo: "https://example.com/logo.jpg",
  cardBrandLogoBgColor: "#000000",
  cardLink: "/products/guitars/electric/fender-stratocaster",
  cardRating: 4.5,
  cardPrice: 999,
};

describe("ProductCard", () => {
  it("renders product title and price", () => {
    render(<ProductCard {...defaultProps} />);

    expect(screen.getByText("Fender Stratocaster")).toBeInTheDocument();
    expect(screen.getByText("$999")).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(i18n.products.from))
    ).toBeInTheDocument();
  });

  it("links to the product page", () => {
    render(<ProductCard {...defaultProps} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/products/guitars/electric/fender-stratocaster"
    );
  });

  it("tracks product_card_clicked on click", () => {
    render(<ProductCard {...defaultProps} />);

    fireEvent.click(screen.getByRole("link"));

    expect(trackEvent).toHaveBeenCalledWith(
      AnalyticsEvents.PRODUCT_CARD_CLICKED,
      {
        title: "Fender Stratocaster",
        url: "/products/guitars/electric/fender-stratocaster",
        price: 999,
        rating: 4.5,
      }
    );
  });
});
