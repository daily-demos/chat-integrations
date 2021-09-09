import { useEffect, useMemo, useRef, useState } from "react";
import Talk from "talkjs";
import Loader from "./Loader";

function Chat({ participants, room }) {
  const chatRef = useRef(null);
  const [chatbox, setChatbox] = useState(null);

  const local = useMemo(() => participants?.local, [participants]);

  useEffect(() => {
    /**
     * Initialize TalkJS chat with the local user's info provided by
     * the Daily callFrame
     */
    const setUpTalkJs = async (user) => {
      await Talk.ready;
      if (!window.talkSession) {
        const me = new Talk.User({
          id: user.session_id,
          name: user.user_name || "Local guest",
          role: "participant",
        });

        window.talkSession = new Talk.Session({
          appId: process.env.REACT_APP_TALK_JS_APP_ID,
          me,
        });

        const conversation = window.talkSession.getOrCreateConversation(room);

        conversation.setAttributes({
          subject: "What's on your mind?",
        });

        conversation.setParticipant(me);

        const cb = window.talkSession.createChatbox(conversation);
        cb.mount(chatRef?.current);

        // Set chat in local state so we know if it's set up already
        setChatbox(cb);
      }
    };

    if (local && !chatbox) {
      setUpTalkJs(local);
    }
  }, [chatbox, local, room]);

  return (
    <div className="chat-container">
      {local && (
        <div style={{ height: "520px" }} ref={chatRef}>
          <Loader />
        </div>
      )}
      <style jsx="true">{`
        .chat-container {
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default Chat;
