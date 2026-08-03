import { render, screen } from "@testing-library/react";
import YoutubeIframe from "components/Tags/YoutubeIframe";
import { i18n } from "@/i18n";

describe("YoutubeIframe", () => {
  it("embeds the YouTube video id from the URL", () => {
    render(<YoutubeIframe url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />);

    const iframe = screen.getByTitle(i18n.media.youtubePlayerTitle);
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );
  });
});
