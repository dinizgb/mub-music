import { render, screen } from "@testing-library/react";
import YoutubeIframe, {
  getYoutubeVideoId,
} from "components/Tags/YoutubeIframe";
import { i18n } from "@/i18n";

describe("getYoutubeVideoId", () => {
  it("reads the id from watch URLs", () => {
    expect(
      getYoutubeVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    ).toBe("dQw4w9WgXcQ");
  });

  it("reads the id from youtu.be URLs", () => {
    expect(getYoutubeVideoId("https://youtu.be/dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ"
    );
  });

  it("reads the id from embed URLs", () => {
    expect(getYoutubeVideoId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ"
    );
  });

  it("returns null for unrecognized URLs", () => {
    expect(getYoutubeVideoId("https://example.com/video")).toBeNull();
  });
});

describe("YoutubeIframe", () => {
  it("embeds the YouTube video id from the URL", () => {
    render(<YoutubeIframe url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />);

    const iframe = screen.getByTitle(i18n.media.youtubePlayerTitle);
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );
  });

  it("embeds videos from youtu.be links", () => {
    render(<YoutubeIframe url="https://youtu.be/dQw4w9WgXcQ" />);

    expect(screen.getByTitle(i18n.media.youtubePlayerTitle)).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );
  });

  it("renders nothing when the URL has no video id", () => {
    const { container } = render(
      <YoutubeIframe url="https://example.com/not-youtube" />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
