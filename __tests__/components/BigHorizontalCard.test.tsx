import { render, screen } from "@testing-library/react";
import BigHorizontalCard from "components/Cards/BigHorizontalCard";

const defaultProps = {
  cardImage: "https://example.com/image.jpg",
  cardSection: "news",
  cardCategory: "Tech",
  cardCategorySlug: "tech",
  cardTitle: "Sample Article",
  cardSlug: "sample-article",
  cardExcerpt: "<p>Sample excerpt</p>",
  date: "2022-04-28T14:40:50",
};

describe("BigHorizontalCard", () => {
  it("renders title, category and excerpt", () => {
    render(<BigHorizontalCard {...defaultProps} />);

    expect(screen.getByText("Sample Article")).toBeInTheDocument();
    expect(screen.getByText("Tech")).toBeInTheDocument();
    expect(screen.getByText("Sample excerpt")).toBeInTheDocument();
  });

  it("links to the article URL built from section, category and slug", () => {
    render(<BigHorizontalCard {...defaultProps} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/news/tech/sample-article/"
    );
  });
});
