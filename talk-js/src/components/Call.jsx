import { useCallback, useEffect, useRef, useState } from "react";
import DailyIframe from "@daily-co/daily-js";
import Chat from "./Chat";
import api from "../api";

/**
 * daily-js call properties: https://docs.daily.co/reference/daily-js/daily-iframe-class/properties
 */
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
  const [talkSession, setTalkSession] = useState(null);

  /**
   * Destroy TalkJS chat widget and reset daily-js-related state
   */
  const leaveCall = useCallback(() => {
    if (talkSession) {
      talkSession.destroy();
      setTalkSession(null);
      // Remove the user from the chat after they leave the call
      api.leaveTalkJsConversation(room, participants.local.session_id);
    }
    setRoom(null);
    setCallFrame(null);
    setHasJoinedMeeting(false);
    callFrame.destroy();
  }, [
    callFrame,
    setCallFrame,
    setRoom,
    room,
    participants,
    talkSession,
    setTalkSession,
  ]);

  /**
   * Create the Daily iframe and join with username from JoinForm
   */
  const createAndJoinCall = useCallback(() => {
    const newCallFrame = DailyIframe.createFrame(
      callRef?.current,
      CALL_OPTIONS
    );

    newCallFrame.join({ url: room, userName: localUsername });

    const updateParticipants = (_, cf) => {
      const participants = cf?.participants();

      if (!hasJoinedMeeting && participants.local.user_name === localUsername) {
        setHasJoinedMeeting(true);
      }
      setParticipants(cf?.participants());
    };

    newCallFrame
      .on("joined-meeting", (e) => updateParticipants(e, newCallFrame))
      .on("participant-updated", (e) => updateParticipants(e, newCallFrame));

    setCallFrame(newCallFrame);
  }, [room, setCallFrame, localUsername, hasJoinedMeeting]);

  /**
   * Initiate Daily iframe creation on component render if it doesn't
   * already exist
   */
  useEffect(() => {
    if (callFrame) return;

    createAndJoinCall();
  }, [callFrame, createAndJoinCall]);

  return (
    <div className="call-container">
      {/* Daily iframe container */}
      <div className="call" ref={callRef}></div>
      <div className="chat-content">
        {hasJoinedMeeting && (
          <button className="leave-button" onClick={leaveCall}>
            Leave call
          </button>
        )}
        {hasJoinedMeeting && (
          <Chat
            participants={participants}
            room={room}
            talkSession={talkSession}
            setTalkSession={setTalkSession}
          />
        )}
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
