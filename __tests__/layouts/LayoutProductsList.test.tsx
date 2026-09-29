import { fireEvent, render, screen } from "@testing-library/react";
import LayoutProductsList from "layouts/LayoutProductsList";
import { AnalyticsEvents } from "lib/analytics/events";
import { trackEvent } from "lib/analytics/track";
import { i18n } from "@/i18n";

jest.mock("components/Tags/Header", () => ({
  __esModule: true,
  default: () => <header data-testid="header" />,
}));

jest.mock("components/Tags/Footer", () => ({
  __esModule: true,
  default: () => <footer data-testid="footer" />,
}));

jest.mock("components/Lists/ProductCardList", () => ({
  __esModule: true,
  default: () => <div data-testid="product-list" />,
}));

jest.mock("components/Widgets/PaginationWidget", () => ({
  __esModule: true,
  default: () => <div data-testid="pagination" />,
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/products/guitars/electric-guitars/",
  useSearchParams: () => new URLSearchParams("brand=fender"),
}));

jest.mock("lib/analytics/track", () => ({
  trackEvent: jest.fn(),
}));

const layoutProps = {
  productData: [{ slug: "strat" }],
  productCategoryData: "guitars",
  productsCategories: [],
  productSubCategories: [
    { slug: "electric-guitars", title: "Electric", count: 2 },
  ],
  productSubCategoryData: "electric-guitars",
  productBrandsData: [{ slug: "fender", title: "Fender", count: 2 }],
  productPriceAverageData: [
    { slug: "0-500", title: "$0 - $500", count: 1 },
    { slug: "500-1000", title: "$500 - $1000", count: 1 },
  ],
  seoData: {
    pageTitle: "Electric Guitars",
    pageExcerpt: "Electric guitars",
  },
  totalCount: 2,
  currentPage: 1,
};

describe("LayoutProductsList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("applies the price average filter on the current subcategory list", () => {
    render(<LayoutProductsList {...layoutProps} />);

    fireEvent.click(screen.getByText(i18n.products.priceAverage));
    fireEvent.click(screen.getByLabelText("$500 - $1000 (1)"));

    expect(trackEvent).toHaveBeenCalledWith(AnalyticsEvents.FILTER_APPLIED, {
      filter_type: "price_average",
      value: "500-1000",
    });
  });

  it("does not apply a filter again when a selected radio is clicked", () => {
    render(<LayoutProductsList {...layoutProps} />);

    fireEvent.click(screen.getByText(i18n.products.brands));
    fireEvent.click(screen.getByLabelText("Fender (2)"));

    expect(trackEvent).not.toHaveBeenCalled();
  });

  it("renders larger radios with top spacing on the first option", () => {
    render(<LayoutProductsList {...layoutProps} />);

    fireEvent.click(screen.getByText(i18n.products.subcategories));
    const firstRadio = screen.getByLabelText("Electric (2)");

    expect(firstRadio).toHaveClass("h-6", "w-6", "border-2");
    expect(firstRadio.parentElement).toHaveClass("first:mt-[15px]");
  });
});
