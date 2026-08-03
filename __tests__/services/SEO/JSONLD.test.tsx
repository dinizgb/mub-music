import { render } from "@testing-library/react";
import JSONLD from "services/SEO/JSONLD";

describe("JSONLD", () => {
  it("renders a script tag with stringified JSON-LD", () => {
    const data = { "@type": "Product", name: "Guitar" };
    const { container } = render(<JSONLD data={data} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );

    expect(script).toBeInTheDocument();
    expect(script?.innerHTML).toBe(JSON.stringify(data));
  });
});
