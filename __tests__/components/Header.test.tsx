import { render } from "@testing-library/react";
import Header from "components/Tags/Header";

jest.mock("components/Tags/Nav", () => ({
  __esModule: true,
  default: () => <nav data-testid="nav" />,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { alt?: string }) => <img alt={props.alt} />,
}));

describe("Header", () => {
  it("uses a single height with even vertical padding on every viewport", () => {
    const { container } = render(<Header productsCategories={[]} />);
    const header = container.querySelector("header");

    expect(header).toHaveClass("h-16");
    expect(header).not.toHaveClass("pb-2.75");
    expect(header?.className).not.toMatch(/(?:max-sm|sm|md|lg):h-/);
  });
});
