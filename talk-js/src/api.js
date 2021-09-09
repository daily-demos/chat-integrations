const api = {
  leaveTalkJsConversation: (conversationId, userId) => {
    fetch(
      `/v1/${process.env.TALK_JS_APP_ID}/conversations/${conversationId}/participants/${userId}`
    )
      .then((res) => console.log(res))
      .catch((err) => console.err(err));
  },
};

export default api;
