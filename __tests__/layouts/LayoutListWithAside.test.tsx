import { render, screen } from "@testing-library/react";
import LayoutListWithAside from "layouts/LayoutListWithAside";
import { postListMock } from "__tests__/__mocks__/postListMock";
import { i18n } from "@/i18n";

jest.mock("components/Tags/Header", () => ({
  __esModule: true,
  default: () => <header data-testid="header" />,
}));

jest.mock("components/Tags/Footer", () => ({
  __esModule: true,
  default: () => <footer data-testid="footer" />,
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/news/",
  useSearchParams: () => new URLSearchParams(),
}));

const layoutProps = {
  postData: postListMock,
  TopFiveWidgetData: "",
  TopFiveWidgetTitle: i18n.news.lastNews,
  layoutSection: "news",
  layoutTitle: i18n.news.title,
  layoutSlug: "",
  layoutDescription: i18n.news.description,
  productsCategories: [],
};

describe("LayoutListWithAside", () => {
  it("renders pagination when there are more posts than one page", () => {
    render(
      <LayoutListWithAside {...layoutProps} totalCount={12} currentPage={1} />
    );

    expect(screen.getByRole("link", { name: "1" })).toHaveAttribute(
      "href",
      "/news/?page=1"
    );
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
      "href",
      "/news/?page=2"
    );
    expect(screen.getByRole("link", { name: "3" })).toHaveAttribute(
      "href",
      "/news/?page=3"
    );
  });

  it("hides pagination when every post fits on one page", () => {
    render(
      <LayoutListWithAside {...layoutProps} totalCount={5} currentPage={1} />
    );

    expect(screen.queryByRole("link", { name: "1" })).not.toBeInTheDocument();
  });
});
