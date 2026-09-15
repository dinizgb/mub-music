import { render, screen } from "@testing-library/react";
import PaginationWidget from "components/Widgets/PaginationWidget";

jest.mock("next/navigation", () => ({
  usePathname: () => "/news/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("PaginationWidget", () => {
  it("shows the next page when the current page is 4 of 10", () => {
    render(<PaginationWidget totalItens={50} currentPage={4} range={5} />);

    expect(screen.getByRole("link", { name: "5" })).toHaveAttribute(
      "href",
      "/news/?page=5"
    );
    expect(screen.getByRole("link", { name: "4" })).toHaveAttribute(
      "href",
      "/news/?page=4"
    );
    expect(screen.getByRole("link", { name: "10" })).toHaveAttribute(
      "href",
      "/news/?page=10"
    );
  });

  it("shows page 7 in a 10-page list", () => {
    render(<PaginationWidget totalItens={50} currentPage={7} range={5} />);

    expect(screen.getByRole("link", { name: "7" })).toHaveAttribute(
      "href",
      "/news/?page=7"
    );
  });
});
