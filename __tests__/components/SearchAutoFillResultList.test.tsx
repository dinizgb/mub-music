/* eslint-disable camelcase */
import { render, screen } from "@testing-library/react";
import SearchAutoFillResultList from "components/Lists/SearchAutoFillResultList";
import { productListMock } from "__tests__/__mocks__/productListMock";

describe("SearchAutoFillResultList", () => {
  it("renders product titles as links", () => {
    render(<SearchAutoFillResultList data={productListMock as any} />);

    expect(screen.getByText("Fender Stratocaster")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Fender Stratocaster/i })
    ).toHaveAttribute("href", "/products/guitars/electric/fender-stratocaster");
  });

  it("shows a loading spinner when data is null", () => {
    const { container } = render(
      <SearchAutoFillResultList data={null as unknown as []} />
    );

    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
