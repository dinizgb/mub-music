import { render, screen } from "@testing-library/react";
import ReviewsSidebarList from "components/Lists/ReviewsSidebarList";
import { i18n } from "@/i18n";

const reviews = [
  {
    count: 12,
    rate: 4.5,
    store: "Thomann",
    logo: "https://example.com/thomann.png",
    url: "https://example.com/review",
  },
];

describe("ReviewsSidebarList", () => {
  it("renders the title and review store name", () => {
    render(
      <ReviewsSidebarList
        title="Reviews"
        isPrimaryTitle={false}
        data={reviews}
      />
    );

    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText(/Thomann/)).toBeInTheDocument();
  });

  it("shows the empty state when there are no reviews", () => {
    render(
      <ReviewsSidebarList title="Reviews" isPrimaryTitle={false} data={[]} />
    );

    expect(screen.getByText(i18n.reviews.empty)).toBeInTheDocument();
  });

  it("applies primary title styles when isPrimaryTitle is true", () => {
    const { container } = render(
      <ReviewsSidebarList
        title="Featured reviews"
        isPrimaryTitle={true}
        data={reviews}
      />
    );

    expect(screen.getByText("Featured reviews")).toHaveClass("text-background");
    expect(container.querySelector(".bg-primary")).toBeInTheDocument();
  });
});
