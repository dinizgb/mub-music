import { render, screen } from "@testing-library/react";
import ProductCardList from "components/Lists/ProductCardList";
import { productListMock } from "__tests__/__mocks__/productListMock";
import { i18n } from "@/i18n";

describe("ProductCardList", () => {
  it("renders a product card for each product", () => {
    render(<ProductCardList productList={productListMock} />);

    expect(screen.getByText("Fender Stratocaster")).toBeInTheDocument();
    expect(screen.getByText("Gibson Les Paul")).toBeInTheDocument();
  });

  it("shows the empty state when there are no products", () => {
    render(<ProductCardList productList={[]} />);

    expect(screen.getByText(i18n.products.empty)).toBeInTheDocument();
  });
});
