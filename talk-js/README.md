# Daily and TalkJS chat integration demo app

This project demonstrates one way to integrate a [Daily Prebuilt](https://daily.co/prebuilt) call with [TalkJS's Chatbox](https://talkjs.com/docs/Reference/JavaScript_Chat_SDK/Chatbox/) in a group call.

<img src="demo1.png" alt="Join form">

---

## Running this demo locally

You will need to set two environment variables locally to use this demo app. Rename `.env.sample` to `.env` and update the following values:

```
REACT_APP_TALK_JS_APP_ID=
REACT_APP_DAILY_API_KEY=
```

(See below for instructions on where to create/retrieve these values.)

Next, in the project directory, run:

```bash
yarn
yarn start
```

Open http://localhost:3000 to view it in the browser.

---

## Setting up Daily and TalkJS accounts

To use this demo, you will need a Daily and a TalkJS account. Both offer free account options.

### Getting set up with Daily

To start, [create a Daily account](https://dashboard.daily.co/signup).

Once you have an account and are logged into the [Daily Dashboard](https://dashboard.daily.co), you can [create a new Daily room](https://dashboard.daily.co/rooms/create).

Copy the new room's URL. You can use this room for this demo.

The room URL will be in the following format:

`https://<your-daily-domain>.daily.co/<room-name>`

### Getting set up with TalkJS

Start by setting up a [TalkJS account](https://talkjs.com/dashboard/login).

You will need two pieces of information for this demo:

- the Test App ID, available in the TalkJS dashboard (string)
- a role type, which can be created from the TalkJS dashboard (string)
  - set this new role type to "participant" or, if you use a different role type, update the `role` value in `Chat.jsx`

<img src="demo2.png" alt="Call UI with TalkJS chat">
