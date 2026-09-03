import { render, screen } from "@testing-library/react";
import Footer from "components/Tags/Footer";
import { i18n } from "@/i18n";

describe("Footer", () => {
  it("renders the copyright text", () => {
    render(<Footer />);

    expect(screen.getByText(i18n.footer.copyright)).toBeInTheDocument();
  });

  it("links to the privacy policy page", () => {
    render(<Footer />);

    expect(
      screen.getByRole("link", { name: i18n.footer.privacyPolicy })
    ).toHaveAttribute("href", "/privacy-policy/");
  });
});
