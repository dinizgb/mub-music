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

  it("hides the menu when display is none", () => {
    const { container } = render(
      <MobileMenu display="none" productsCategories={productsCategories} />
    );

    expect(container.firstChild).toHaveClass("hidden");
  });
});
