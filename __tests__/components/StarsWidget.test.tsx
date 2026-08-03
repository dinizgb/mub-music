import { render } from "@testing-library/react";
import StarsWidget from "components/Widgets/StarsWidget";

describe("StarsWidget", () => {
  it("renders five star icons for a full rating", () => {
    const { container } = render(
      <StarsWidget fontSize={12} number={5} withBackground={false} />
    );

    expect(container.querySelectorAll("svg")).toHaveLength(5);
  });

  it("applies background classes when withBackground is true", () => {
    const { container } = render(
      <StarsWidget fontSize={12} number={4} withBackground={true} />
    );

    expect(container.firstChild).toHaveClass("bg-black/80");
  });

  it("renders a half-star layout for ratings below 1", () => {
    const { container } = render(
      <StarsWidget fontSize={12} number={0.5} withBackground={false} />
    );

    expect(container.querySelectorAll("svg").length).toBeGreaterThan(0);
  });

  it("renders a half star plus outlines when decimal is high and space remains", () => {
    // 3.5 -> first=3, second=5 (>1), remaining=2 (>1)
    const { container } = render(
      <StarsWidget fontSize={12} number={3.5} withBackground={false} />
    );

    expect(container.querySelectorAll("svg")).toHaveLength(5);
  });

  it("renders half stars when remaining space is exactly one", () => {
    // 4.5 -> first=4, second=5 (>1), remaining=1 (else branch)
    const { container } = render(
      <StarsWidget fontSize={12} number={4.5} withBackground={false} />
    );

    expect(container.querySelectorAll("svg")).toHaveLength(5);
  });

  it("renders outline stars when the decimal part is low", () => {
    // 3.0 -> first=3, second=0 (not >1)
    const { container } = render(
      <StarsWidget fontSize={12} number={3.0} withBackground={false} />
    );

    expect(container.querySelectorAll("svg")).toHaveLength(5);
  });
});
