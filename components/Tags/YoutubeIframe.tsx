/* eslint-disable react/no-unknown-property */
import getUrlParameterValue from "utils/getUrlParameterValue";
import { i18n } from "@/i18n";

type YoutubeIframeProps = {
  url: string;
};

/**
 * Extracts a YouTube video id from common URL shapes.
 * @param {string} url Video URL from the CMS.
 * @return {string | null} Video id, or null when it cannot be parsed.
 */
export function getYoutubeVideoId(url: string): string | null {
  if (!url) {
    return null;
  }

  const fromQuery = getUrlParameterValue(url, "v");
  if (fromQuery) {
    return fromQuery;
  }

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (
        parts[0] === "embed" ||
        parts[0] === "shorts" ||
        parts[0] === "live" ||
        parts[0] === "v"
      ) {
        return parts[1] || null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Youtube Iframe Component.
 * @param {YoutubeIframeProps} props to the component.
 * @return {TSX.Element | null}: The TSX code for the Youtube Iframe Component.
 */
export default function YoutubeIframe(props: YoutubeIframeProps) {
  const videoId = getYoutubeVideoId(props.url);

  if (!videoId) {
    return null;
  }

  return (
    <div className="relative w-full">
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={i18n.media.youtubePlayerTitle}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
