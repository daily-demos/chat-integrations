import Chat from "./Chat";

function Main() {
  return (
    <main>
      <h1>Daily + Twilio Flex WebChat demo</h1>
      <p>
        To test this demo, start by clicking the chat widget in the bottom right
        corner of the page.
      </p>
      <p>
        Enter a username to join the chat. Click the video icon to launch a
        Daily call.
      </p>
      <Chat />
      <style jsx="true">{`
        main {
          padding: 2rem;
          flex: 1;
          max-width: 600px;
        }
      `}</style>
    </main>
  );
}

export default Main;
