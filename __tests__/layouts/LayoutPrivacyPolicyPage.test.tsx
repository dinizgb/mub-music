import { render, screen } from "@testing-library/react";
import LayoutPrivacyPolicyPage from "layouts/LayoutPrivacyPolicyPage";
import { i18n, t } from "@/i18n";

jest.mock("components/Tags/Header", () => ({
  __esModule: true,
  default: () => <header data-testid="header" />,
}));

jest.mock("components/Tags/Footer", () => ({
  __esModule: true,
  default: () => <footer data-testid="footer" />,
}));

describe("LayoutPrivacyPolicyPage", () => {
  it("renders privacy policy sections and contact email", () => {
    render(<LayoutPrivacyPolicyPage productsCategories={[]} />);

    expect(
      screen.getByRole("heading", { level: 1, name: i18n.privacyPolicy.title })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: i18n.privacyPolicy.analyticsTitle,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(i18n.privacyPolicy.informationItemSession)
    ).toBeInTheDocument();
    expect(
      screen.getByText(i18n.privacyPolicy.analyticsBody)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        t(i18n.privacyPolicy.whoWeAreBody, {
          email: i18n.privacyPolicy.contactEmail,
        })
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
