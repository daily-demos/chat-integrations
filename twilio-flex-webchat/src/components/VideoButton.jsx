import React from "react";
import * as FlexWebChat from "@twilio/flex-webchat-ui";

const VideoButton = ({ onClick }) => {
  return (
    <span className="video-icon-container" onClick={onClick}>
      <FlexWebChat.Icon icon="Video" />
      <style jsx="true">{`
        .video-icon-container {
          cursor: pointer;
        }
      `}</style>
    </span>
  );
};
export default VideoButton;
