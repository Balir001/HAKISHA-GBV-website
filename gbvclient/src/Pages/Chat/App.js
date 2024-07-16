import "./Conversation.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from './Chat'

const socket = io.connect("http://localhost:3002");

const App = ({ roomId,handleClose }) => {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (roomId) {
      console.log("Joining room:", roomId); // Log the room being joined
      socket.emit("join_room", roomId);
      setShowChat(true);
    }
  }, [roomId]);

  return (
    <div className=" chat-App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          {/* <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          /> */}
        </div>
      ) : (
        <div className="chat-space">
          
          <Chat socket={socket} roomId={roomId}  handleClose={handleClose}  />
        </div>
        
      )}
    </div>
  );
};
export default App;