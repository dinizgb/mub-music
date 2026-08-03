import { render, screen } from "@testing-library/react";
import {
  H1,
  H2,
  H3,
  H4,
  P,
  Span,
  A,
  FaviconText,
} from "components/Texts/Typographies";

const baseProps = {
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 24,
};

describe("Typographies", () => {
  it("renders H1 with children", () => {
    render(<H1 {...baseProps}>Heading One</H1>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Heading One"
    );
  });

  it("applies MainTitle font class on H2", () => {
    render(
      <H2 {...baseProps} fontType="MainTitle">
        Main Title
      </H2>
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveClass(
      "font-heading"
    );
  });

  it("applies default open font class on H2 without MainTitle", () => {
    render(<H2 {...baseProps}>Regular Title</H2>);
    expect(screen.getByRole("heading", { level: 2 })).toHaveClass("font-open");
  });

  it("renders H3, H4, P and Span", () => {
    render(
      <>
        <H3 {...baseProps}>Three</H3>
        <H4 {...baseProps}>Four</H4>
        <P {...baseProps}>Paragraph</P>
        <Span {...baseProps}>Inline</Span>
      </>
    );

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Three"
    );
    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("Four");
    expect(screen.getByText("Paragraph")).toBeInTheDocument();
    expect(screen.getByText("Inline")).toBeInTheDocument();
  });

  it("renders A as a link and FaviconText as emphasis", () => {
    render(
      <>
        <A {...baseProps} href="/news/">
          News link
        </A>
        <FaviconText {...baseProps}>Brand</FaviconText>
      </>
    );

    expect(screen.getByRole("link", { name: "News link" })).toHaveAttribute(
      "href",
      "/news/"
    );
    expect(screen.getByText("Brand").tagName).toBe("EM");
  });

  it("sets sm and xs CSS variables when responsive sizes are provided", () => {
    render(
      <H1
        {...baseProps}
        smFontSize={18}
        smLineHeight={28}
        xsFontSize={14}
        xsLineHeight={20}
      >
        Responsive
      </H1>
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveStyle({
      "--typo-sm-font-size": "18px",
      "--typo-sm-line-height": "28px",
      "--typo-xs-font-size": "14px",
      "--typo-xs-line-height": "20px",
    });
  });
});
