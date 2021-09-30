import Header from "./Header";
import Footer from "./Footer";
import Call from "./Call";
import JoinForm from "./JoinForm";
import "../index.css";
import { useEffect, useState } from "react";

function App() {
  const [room, setRoom] = useState(null);
  const [localUsername, setLocalUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [callFrame, setCallFrame] = useState(null);

  /**
   * Clean-up: if the room has been cleared, assume the call is over
   */
  useEffect(() => {
    if (!room && callFrame) {
      callFrame.destroy();
    }
  }, [room, callFrame]);

  return (
    <div className="app-container">
      <Header />
      <main>
        {room ? (
          <Call
            room={room}
            setCallFrame={setCallFrame}
            callFrame={callFrame}
            setRoom={setRoom}
            localUsername={localUsername}
            token={token}
          />
        ) : (
          <JoinForm
            setRoom={setRoom}
            setToken={setToken}
            setLocalUsername={setLocalUsername}
          />
        )}
      </main>
      <Footer />
      <style jsx>{`
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          overflow: auto;
          background-color: #fff;
          max-width: 1200px;
          margin: auto;
        }
        main {
          padding: 2rem;
          flex: 1;
        }
      `}</style>
    </div>
  );
}

export default App;
