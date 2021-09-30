import * as FlexWebChat from "@twilio/flex-webchat-ui";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import config from "../twilioConfig";
import DailyVideo from "./DailyVideo";
import VideoButton from "./VideoButton";

function Chat() {
  const [chat, setChat] = useState({});
  const [showVideo, setShowVideo] = useState(false);
  const [username, setUsername] = useState(null);

  /**
   * Click handler for video icon button added to Flex WebChat UI header
   */
  const onVideoClick = () => {
    setShowVideo(true);
  };

  /**
   * Add Flex WebChat widget to page
   */
  useEffect(() => {
    if (chat?.manager?.store) return;
    FlexWebChat.Manager.create(config)
      .then((manager) => {
        FlexWebChat.MainHeader.Content.add(
          <VideoButton key="video-icon" onClick={onVideoClick} />,
          { sortOrder: -1, align: "end" }
        );
        // Set username in state after user fills out form
        FlexWebChat.Actions.addListener("afterStartEngagement", (payload) => {
          const { friendlyName } = payload.formData;
          setUsername(friendlyName);
        });
        setChat({ manager });
      })
      .catch((error) => setChat({ error }));
  }, [chat]);

  /** Turn off video if they haven't entered a name yet */
  useEffect(() => {
    if (showVideo && !username) {
      setShowVideo(false);
    }
  }, [showVideo, username]);

  /** Share the Daily link in the chat */
  const sendDailyLink = useCallback(
    (url) => {
      const { channelSid } = chat.manager.store.getState().flex.session;
      chat.manager.chatClient.getChannelBySid(channelSid).then((channel) => {
        const message = `Let's chat over video. Tip: Use this external link if the video does not automatically open: ${url}`;
        /**
         * Send url as message so chat moderator has a link to it too.
         */
        channel.sendMessage(message);
      });
    },
    [chat]
  );
  /** Share the Daily link in the chat */
  const sendLeaveMessage = useCallback(() => {
    const { channelSid } = chat.manager.store.getState().flex.session;
    chat.manager.chatClient.getChannelBySid(channelSid).then((channel) => {
      const message = "Video chat ended.";
      channel.sendMessage(message);
    });
  }, [chat]);

  return (
    <div className="chat-container">
      {showVideo && username && (
        <DailyVideo
          username={username}
          setShowVideo={setShowVideo}
          sendDailyLink={sendDailyLink}
          sendLeaveMessage={sendLeaveMessage}
        />
      )}
      {chat?.manager && (
        <div>
          <FlexWebChat.ContextProvider
            manager={chat?.manager}
            isEntryPointExpanded
          >
            <FlexWebChat.RootContainer />
          </FlexWebChat.ContextProvider>
        </div>
      )}
      {chat?.error && <p className="error-msg">{chat?.error.toString()}</p>}
      <style jsx>{`
        .error-msg {
          color: #f63135;
        }
      `}</style>
    </div>
  );
}

export default Chat;
