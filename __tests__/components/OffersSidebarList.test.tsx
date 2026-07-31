import { render, screen } from "@testing-library/react";
import OffersSidebarList from "components/Lists/OffersSidebarList";
import { i18n } from "@/i18n";

const offers = [
  {
    logo: "https://example.com/store.png",
    price: 199,
    store: "Sweetwater",
    url: "https://example.com/offer",
  },
];

describe("OffersSidebarList", () => {
  it("renders the title and offer details", () => {
    render(
      <OffersSidebarList
        title="Offers available"
        isPrimaryTitle={true}
        data={offers}
      />
    );

    expect(screen.getByText("Offers available")).toBeInTheDocument();
    expect(screen.getByText("Sweetwater")).toBeInTheDocument();
    expect(screen.getByText("$199")).toBeInTheDocument();
    expect(screen.getByText(i18n.offers.from)).toBeInTheDocument();
  });

  it("shows the empty state when data is null", () => {
    render(
      <OffersSidebarList
        title="Offers available"
        isPrimaryTitle={false}
        data={null as unknown as []}
      />
    );

    expect(screen.getByText(i18n.offers.empty)).toBeInTheDocument();
  });
});
