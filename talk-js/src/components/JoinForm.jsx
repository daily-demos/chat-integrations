import { useRef } from "react";

function JoinForm({ setRoom, setLocalUsername }) {
  const roomRef = useRef(null);

  const joinCall = (e) => {
    e.preventDefault();
    const roomUrl = roomRef?.current?.value;
    if (!roomUrl) return; //TODO: handle error

    setRoom(roomUrl);
  };

  return (
    <form onSubmit={joinCall}>
      <h1>Daily + TalkJS demo</h1>
      <div className="input-container">
        <label htmlFor="room">Daily room URL</label>
        <input id="room" type="text" ref={roomRef} required />
      </div>
      <div className="input-container">
        <label htmlFor="username">Your Name</label>
        <input
          id="username"
          type="text"
          onChange={(e) => setLocalUsername(e.target.value)}
          required
        />
      </div>
      <input type="submit" value="Join call" />
      <style jsx="true">{`
        form {
          margin-top: 5rem;
          display: flex;
          flex-direction: column;
          background-color: #fff;
          border-radius: 6px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06),
            0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.06),
            0 8px 16px rgba(0, 0, 0, 0.06), 0 16px 32px rgba(0, 0, 0, 0.06);
          padding: 1.5rem;
          max-width: 500px;
          margin: auto;
        }
        .input-container {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        label {
          font-size: 12px;
          color: #6b7785;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        input[type="text"] {
          padding: 0.5rem;
          border-radius: 6px;
          border: 1px solid #c8d1dc;
        }

        input[type="submit"] {
          padding: 0.5rem 1rem 0.5rem;
          border-radius: 6px;
          background-color: #1bebb9;
          border: 1px solid #1bebb9;
          color: #121a24;
          margin-top: 2rem;
          margin-left: auto;
          cursor: pointer;
          font-family: "Graphik Medium", Helvetica, Arial, sans-serif;
          font-size: 12px;
        }
      `}</style>
    </form>
  );
}

export default JoinForm;
