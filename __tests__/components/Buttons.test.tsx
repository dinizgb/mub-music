import { render, screen } from "@testing-library/react";
import {
  FilterButton,
  PrimaryButton,
  WhiteButton,
} from "components/Inputs/Buttons";

describe("Buttons", () => {
  it("renders FilterButton children", () => {
    render(<FilterButton>Filter</FilterButton>);
    expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument();
  });

  it("renders PrimaryButton as a link", () => {
    render(<PrimaryButton href="/products/">Shop products</PrimaryButton>);

    expect(screen.getByRole("link", { name: "Shop products" })).toHaveAttribute(
      "href",
      "/products/"
    );
  });

  it("applies fontSize style on PrimaryButton when provided", () => {
    render(
      <PrimaryButton href="/products/" fontSize={18}>
        Sized CTA
      </PrimaryButton>
    );

    expect(screen.getByRole("link", { name: "Sized CTA" })).toHaveStyle({
      fontSize: "18px",
    });
  });

  it("renders WhiteButton as a link", () => {
    render(<WhiteButton href="/news/">More news</WhiteButton>);

    expect(screen.getByRole("link", { name: "More news" })).toHaveAttribute(
      "href",
      "/news/"
    );
  });
});
