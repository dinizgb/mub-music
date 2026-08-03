import { render, screen } from "@testing-library/react";
import SmallHorizontalCard from "components/Cards/SmallHorizontalCard";

describe("SmallHorizontalCard", () => {
  it("renders card title and links to the given URL", () => {
    render(
      <SmallHorizontalCard
        cardImage="https://example.com/image.jpg"
        cardTitle="Small Card Title"
        cardDate="2022-04-28T14:40:50"
        cardLink="/news/tech/small-card/"
      />
    );

    expect(screen.getByText("Small Card Title")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/news/tech/small-card/"
    );
  });
});
