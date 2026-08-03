import { render, screen } from "@testing-library/react";
import BackgroundCard from "components/Cards/BackgroundCard";

describe("BackgroundCard", () => {
  it("renders the category title and link", () => {
    render(
      <BackgroundCard
        backgroundCardThumbnail="https://example.com/bg.jpg"
        backgroundCardUrl="/products/guitars"
        backgroundCardTitle="Guitars"
      />
    );

    expect(screen.getByText("Guitars")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/products/guitars"
    );
  });
});
