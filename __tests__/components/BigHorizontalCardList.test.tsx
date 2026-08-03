import { render, screen } from "@testing-library/react";
import BigHorizontalCardList from "components/Lists/BigHorizontalCardList";
import { postListMock } from "__tests__/__mocks__/postListMock";

describe("BigHorizontalCardList", () => {
  it("renders a card for each post in the list", () => {
    render(<BigHorizontalCardList postList={postListMock} />);

    expect(screen.getByText("Test Post 1")).toBeInTheDocument();
    expect(screen.getByText("Test Post 2")).toBeInTheDocument();
  });

  it("links each card to the news article path", () => {
    render(<BigHorizontalCardList postList={postListMock} />);

    expect(screen.getByRole("link", { name: /Test Post 1/i })).toHaveAttribute(
      "href",
      "/news/tech/test-post-1/"
    );
    expect(screen.getByRole("link", { name: /Test Post 2/i })).toHaveAttribute(
      "href",
      "/news/awards/test-post-2/"
    );
  });

  it("renders nothing when the post list is empty", () => {
    const { container } = render(<BigHorizontalCardList postList={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
