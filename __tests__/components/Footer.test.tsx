import { render, screen } from "@testing-library/react";
import Footer from "components/Tags/Footer";
import { i18n } from "@/i18n";

describe("Footer", () => {
  it("renders the copyright text", () => {
    render(<Footer />);

    expect(screen.getByText(i18n.footer.copyright)).toBeInTheDocument();
  });
});
