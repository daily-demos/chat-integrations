import * as FlexWebChat from "@twilio/flex-webchat-ui";
import { useCallback, useEffect, useRef, useState } from "react";
import DailyIframe from "@daily-co/daily-js";
import api from "../api";
/**
 * daily-js call properties: https://docs.daily.co/reference/daily-js/daily-iframe-class/properties
 */
const CALL_OPTIONS = {
  iframeStyle: {
    width: "100%",
    height: "100%",
    maxWidth: "275px",
    aspectRatio: 9 / 16,
    border: "1px solid #e6eaef",
    borderRadius: "6px 6px 0 0",
    boxShadow: `0 1px 2px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.02),
      0 4px 8px rgba(0, 0, 0, 0.02), 0 8px 16px rgba(0, 0, 0, 0.02),
      0 16px 32px rgba(0, 0, 0, 0.02)`,
  },
  showLeaveButton: false,
  showParticipantsBar: false,
};

const DailyVideo = ({
  username,
  setShowVideo,
  sendDailyLink,
  sendLeaveMessage,
}) => {
  const callRef = useRef(null);
  const [callFrame, setCallFrame] = useState(null);
  const [error, setError] = useState(null);
  const [roomName, setRoomName] = useState(null);

  /**
   * Create the Daily iframe and join with username set in Flex WebChat UI
   */
  const createAndJoinCall = useCallback(async () => {
    /**
     * Start by creating a unique Daily room and token for this call
     */

    const room = await api.createDailyRoom();
    if (!room.name) {
      setError("Could not create Daily room");
      return;
    }
    setRoomName(room.name);
    /**
     * We create a token to avoid the name form showing in
     * Daily prebuilt's UI
     */
    const { token } = await api.createDailyToken(room.name, username);
    if (!token) {
      setError("Could not create Daily token");
      return;
    }
    /**
     * Once the Daily room and token are created, we can initialize
     * the Daily callframe
     */
    const newCallFrame = DailyIframe.createFrame(
      callRef?.current,
      CALL_OPTIONS
    );

    newCallFrame.join({ url: room.url, token });
    sendDailyLink(room.url);

    setCallFrame(newCallFrame);
  }, [setCallFrame, username, sendDailyLink]);

  /**
   * Destroy Daily callframe and reset local state
   */
  const leaveCall = useCallback(async () => {
    if (callFrame) {
      callFrame.leave();
      callFrame.destroy();
      setShowVideo(false);
    }
    sendLeaveMessage();
    await api.deleteDailyRoom(roomName);
    /* You may want to show an error if the delete fails
     * but in our case the user doesn't need to know
     */
  }, [callFrame, setShowVideo, roomName, sendLeaveMessage]);

  /**
   * Create Daily callframe as soon as username is available
   * if it doesn't already exist.
   */
  useEffect(() => {
    if (!username || callFrame) return;

    createAndJoinCall();
  }, [username, callFrame, createAndJoinCall]);

  return (
    <div className="call-container">
      {error && <p className="error-msg">{error}</p>}
      <div className="leave-call-container">
        <button className="leave-call-button" onClick={leaveCall}>
          x
        </button>
      </div>
      {/* Daily iframe container */}
      <div className="call" ref={callRef}></div>
      <style jsx>{`
        .call-container {
          position: fixed;
          right: 305px;
          bottom: 70px;
          display: flex;
          flex-direction: column;
        }
        .error-msg {
          color: #f63135;
        }
        .leave-call-container {
          margin-left: auto;
        }
        .leave-call-button {
          background-color: #f63135;
          border: 1px solid #f63135;
          color: #fff;
          border-radius: 4px;
          margin-bottom: 4px;
          padding: 2px 8px;
          cursor: pointer;
        }
        .leave-call-button:active {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};
export default DailyVideo;
