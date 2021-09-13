/**
 * These endpoints are included client-side for demo purposes only.
 * Do *not* included these endpoints client-side in production code to ensure API keys are not exposed.
 */
const api = {
  leaveTalkJsConversation: async (conversationId, userId) => {
    const conversation = await fetch(
      `/v1/${process.env.TALK_JS_APP_ID}/conversations/${conversationId}/participants/${userId}`
    );
    console.log(conversation);
  },
  createDailyToken: async (roomName, username) => {
    const tokenReq = await fetch(`https://api.daily.co/v1/meeting-tokens`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_DAILY_API_KEY,
      },
      body: JSON.stringify({
        properties: { room_name: roomName, user_name: username },
      }),
    });
    const res = await tokenReq.json();
    return res;
  },
};

export default api;
