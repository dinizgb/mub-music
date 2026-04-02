/* eslint-disable react/no-unknown-property */
import React from "react";
import styled from "styled-components";
import getUrlParameterValue from "utils/getUrlParameterValue";

const YoutubeIframeWrapper = styled.div`
  width: 100%;
  position: relative;
`;

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
    <YoutubeIframeWrapper>
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${getUrlParameterValue(
          props.url,
          "v"
        )}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </YoutubeIframeWrapper>
  );
}
