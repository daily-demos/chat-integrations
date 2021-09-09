import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DailyIframe from "@daily-co/daily-js";
import Chat from "./Chat";
import api from "../api";

const CALL_OPTIONS = {
  iframeStyle: {
    width: "100%",
    height: "100%",
    minHeight: "520px",
    aspectRatio: 16 / 9,
    border: "1px solid #e6eaef",
    borderRadius: "6px 6px 0 0",
    boxShadow: `0 1px 2px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.02),
      0 4px 8px rgba(0, 0, 0, 0.02), 0 8px 16px rgba(0, 0, 0, 0.02),
      0 16px 32px rgba(0, 0, 0, 0.02)`,
  },
  showLeaveButton: false,
};

function Call({ room, setCallFrame, callFrame, setRoom, localUsername }) {
  const callRef = useRef(null);
  const [participants, setParticipants] = useState(null);
  const [hasJoinedMeeting, setHasJoinedMeeting] = useState(false);

  const leaveCall = useCallback(() => {
    if (window.talkSession) {
      window.talkSession.destroy();
      window.talkSession = null;
      // Remove the user from the chat after they leave the call
      api.leaveTalkJsConversation(room, participants.local.session_id);
    }
    setRoom(null);
    setCallFrame(null);
    setHasJoinedMeeting(false);
    callFrame.destroy();
  }, [callFrame, setCallFrame, setRoom, room, participants]);

  const createAndJoinCall = useCallback(() => {
    const newCallFrame = DailyIframe.createFrame(
      callRef?.current,
      CALL_OPTIONS
    );

    newCallFrame.join({ url: room, userName: localUsername });

    const updateParticipants = (_, cf) => {
      const participants = cf?.participants();

      /**
       * Minor workaround. We don't want to initialize the chat until the
       * username is updated, which doesn't happen until right after joining.
       * So we need to wait for the new username to be set before passing it
       * to TalkJS.
       */
      if (!hasJoinedMeeting && participants.local.user_name === localUsername) {
        setHasJoinedMeeting(true);
      }
      setParticipants(cf?.participants());
    };

    newCallFrame
      .on("joined-meeting", (e) => updateParticipants(e, newCallFrame))
      .on("participant-updated", (e) => updateParticipants(e, newCallFrame));

    setCallFrame(newCallFrame);
  }, [room, setCallFrame, localUsername]);

  useEffect(() => {
    if (callFrame) return;

    createAndJoinCall();
  }, [callFrame, createAndJoinCall]);

  return (
    <div className="call-container">
      <div className="call" ref={callRef}></div>
      <div className="chat-content">
        {hasJoinedMeeting && (
          <button className="leave-button" onClick={leaveCall}>
            Leave call
          </button>
        )}
        {hasJoinedMeeting && <Chat participants={participants} room={room} />}
      </div>
      <style jsx="true">{`
        .call-container {
          display: flex;
          justify-content: space-between;
        }
        .call {
          max-width: 700px;
          flex: 1;
          margin-bottom: 1rem;
        }

        .chat-content {
          padding: 0 2rem;
          justify-content: flex-end;
          display: flex;
          flex-direction: column;
        }

        button.leave-button {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          background-color: #f63135;
          border: 1px solid #f63135;
          color: #fff;
          margin-bottom: 1rem;
          cursor: pointer;
          font-family: "Graphik Medium", Helvetica, Arial, sans-serif;
          font-size: 12px;
        }

        @media (max-width: 1000px) {
          .call-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Call;
