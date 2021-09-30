import { useEffect, useMemo, useRef, useState } from "react";
import Talk from "talkjs";
import Loader from "./Loader";

function Chat({ participants, room, setTalkSession }) {
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

      const me = new Talk.User({
        id: user.session_id,
        name: user.user_name || "Local guest",
        role: "participant",
      });

      const session = new Talk.Session({
        appId: process.env.REACT_APP_TALK_JS_APP_ID,
        me,
      });

      const conversation = session.getOrCreateConversation(room);

      conversation.setAttributes({
        subject: "What's on your mind?",
      });

      conversation.setParticipant(me);

      const cb = session.createChatbox(conversation);
      cb.mount(chatRef?.current);

      // Set chat in local state so we know if it's set up already
      setChatbox(cb);
      setTalkSession(session);
    };

    if (local && !chatbox) {
      setUpTalkJs(local);
    }
  }, [chatbox, local, room, setTalkSession]);

  return (
    <div className="chat-container">
      {local && (
        <div style={{ height: "500px" }} ref={chatRef}>
          <Loader />
        </div>
      )}
      <style jsx>{`
        .chat-container {
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default Chat;
