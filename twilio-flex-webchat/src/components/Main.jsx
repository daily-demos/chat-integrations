import Chat from "./Chat";

function Main() {
  return (
    <main>
      <h1>Daily + Twilio Flex WebChat demo</h1>
      <p>
        To test this demo, start by opening the widget in the bottom right
        corner of the page.
      </p>
      <p>Enter a username and click the video icon to launch a Daily call.</p>
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
