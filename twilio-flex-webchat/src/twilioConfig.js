const config = {
  disableLocalStorage: true,
  accountSid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
  flexFlowSid: process.env.REACT_APP_TWILIO_FLEX_FLOW_SID,
  // Optional: update theme: https://www.twilio.com/docs/flex/developer/webchat/theming
  // colorTheme: {
  //   overrides,
  // },
  startEngagementOnInit: false,
  preEngagementConfig: {
    description: "Please provide some information",
    fields: [
      {
        label: "What is your name?",
        type: "InputItem",
        attributes: {
          name: "friendlyName",
          type: "text",
          required: true,
        },
      },
    ],
    submitLabel: "Ok Let's Go!",
  },
  componentProps: {
    MainHeader: {
      titleText: "Daily demo",
    },
  },
};

export default config;
