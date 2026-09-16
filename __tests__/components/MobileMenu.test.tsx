import { render, screen } from "@testing-library/react";
import MobileMenu from "components/Menus/MobileMenu";
import { i18n } from "@/i18n";

const productsCategories = [
  { slug: "guitars", title: "Guitars" },
  { slug: "drums", title: "Drums" },
] as any;

describe("MobileMenu", () => {
  it("renders products and news section labels", () => {
    render(
      <MobileMenu display="block" productsCategories={productsCategories} />
    );

    expect(screen.getByText(i18n.nav.products)).toBeInTheDocument();
    expect(screen.getByText(i18n.nav.news)).toBeInTheDocument();
    expect(screen.getByText("Guitars")).toBeInTheDocument();
    expect(screen.getByText(i18n.nav.awards)).toBeInTheDocument();
  });

  it("links the products and news headers to their home pages", () => {
    render(
      <MobileMenu display="block" productsCategories={productsCategories} />
    );

    expect(
      screen.getByRole("link", { name: i18n.nav.products })
    ).toHaveAttribute("href", "/products/");
    expect(screen.getByRole("link", { name: i18n.nav.news })).toHaveAttribute(
      "href",
      "/news/"
    );
  });

  it("gives the products and news headers hover and focus styles", () => {
    render(
      <MobileMenu display="block" productsCategories={productsCategories} />
    );

    const productsHeader = screen.getByRole("link", {
      name: i18n.nav.products,
    });
    const newsHeader = screen.getByRole("link", { name: i18n.nav.news });

    expect(productsHeader).toHaveClass("hover:bg-primary-hover");
    expect(productsHeader).toHaveClass("focus-visible:bg-primary-hover");
    expect(newsHeader).toHaveClass("hover:bg-primary-hover");
    expect(newsHeader).toHaveClass("focus-visible:bg-primary-hover");
  });

  it("hides the menu when display is none", () => {
    const { container } = render(
      <MobileMenu display="none" productsCategories={productsCategories} />
    );

    expect(container.firstChild).toHaveClass("hidden");
  });
});
