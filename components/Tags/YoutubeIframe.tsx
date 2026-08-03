/* eslint-disable react/no-unknown-property */
import getUrlParameterValue from "utils/getUrlParameterValue";
import { i18n } from "@/i18n";

type YoutubeIframeProps = {
  url: string;
};

/**
 * Youtube Iframe Component.
 * @param {YoutubeIframeProps} props to the component.
 * @return {TSX.Element}: The TSX code for the Youtube Iframe Component.
 */
export default function YoutubeIframe(props: YoutubeIframeProps) {
  return (
    <div className="relative w-full">
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${getUrlParameterValue(
          props.url,
          "v"
        )}`}
        title={i18n.media.youtubePlayerTitle}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
