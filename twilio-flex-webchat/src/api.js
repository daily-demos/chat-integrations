/**
 * These endpoints are included client-side for demo purposes only.
 * Do *not* include these endpoints client-side in production code to ensure API keys are not exposed.
 * If you're looking for an example of how to deploy a backend server, here's a tutorial: https://www.daily.co/blog/deploy-a-daily-co-backend-node-js-server-instantly/"
 */
const api = {
  createDailyRoom: async () => {
    const roomReq = await fetch(`https://api.daily.co/v1/rooms`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_DAILY_API_KEY,
      },
      body: JSON.stringify({
        properties: {
          enable_prejoin_ui: false,
          enable_screenshare: false,
          enable_chat: false,
        },
      }),
    });
    const res = await roomReq.json();
    return res;
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
        properties: {
          room_name: roomName,
          user_name: username,
        },
      }),
    });
    const res = await tokenReq.json();
    return res;
  },
  deleteDailyRoom: async (roomName) => {
    const roomReq = await fetch(`https://api.daily.co/v1/rooms/${roomName}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_DAILY_API_KEY,
      },
    });
    const res = await roomReq.json();
    return res;
  },
};

export default api;
