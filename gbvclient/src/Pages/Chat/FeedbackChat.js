import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetData } from "../../CustomHook/GetHook.js";
import { usePostData } from "../../CustomHook/posthooks.js";
import "./Conversation.css";
import App from "./App.js";
import { Feedbacktable } from "./feedBackTable.js";

export const Feedbackchat = () => {
  const [showChat, setShowChat] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [room, setRoom] = useState("");
  const [profile, setProfile] = useState("");
  const [role, setSelectedRole] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);

  const navigate = useNavigate();

  // Fetch users by role
  const { data, loading, error } = useGetData(`user/getUserByRole?roleId=${role}`);

  // Post support seeker id to initiate a room
  const { data: roomId, loading: loadingRoomId, error: errorLoadingRoomId, postData } = usePostData("chat/createRoom");

  const { data: roomMembers, loading: loadingRoomMembers, error: errorLoadingRoomMembers, postData: postRoomMembers } = usePostData("chat/submitRoomMember");

  // Fetch roles data
  useEffect(() => {
    axios
      .get("http://localhost:3001/hakisha/entry/getRole")
      .then((response) => {
        setRoleOptions(response.data.roles); // Update this line
      })
      .catch((error) => {
        console.error("Error fetching Roles:", error);
      });
  }, []);

  useEffect(() => {
    // This effect will run whenever the 'roomId' state changes
    if (roomId) {
      console.log(roomId);
      if (typeof roomId === "object" && roomId.roomExists) {
        // Room already exists, skip creating a new room member
        setRoom(roomId.roomId);
        setShowChat(true);
        setShowTable(false);
      } else {
        // New room created, set the room and continue with creating a new room member
        setRoom(roomId);
      }
    }
  }, [roomId]);

  useEffect(() => {
    if (room) {
      // Create an object with the required data for postRoomMembers
      const messageReceiverId = profile;
      console.log(room);
      console.log(messageReceiverId);

      if (roomId && typeof roomId === "object" && roomId.roomExists) {
        // Room already exists, skip creating a new room member
        setShowChat(true);
        setShowTable(false);
      } else {
        // Call postRoomMembers with the payload
        postRoomMembers({ messageReceiverId, room });
        setShowChat(true);
        setShowTable(false);
      }
    }
  }, [room]);

  // Handle chat initiation
  const handleChat = async (profile) => {
    try {
      await postData({ profile });
      setProfile(profile.id);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  // Handle closing chat
  const handleClose = () => {
    setShowTable(true);
    setShowChat(false);
  };

  return (
    <div className="Councelor-chat">
      {showTable ? (
        <div className="Table-Screen">
          <label>
            Role:
            <select value={role} onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="">Select...</option>
              {roleOptions.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.Role}
                </option>
              ))}
            </select>
          </label>
          <div className="Scroll-case">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error fetching data: {error}</div>
            ) : data && data.length > 0 ? (
              <Feedbacktable data={data} handleClose={handleClose} handleChat={handleChat} />
            ) : (
              <div className="Victim-Profile border-blue">No data</div>
            )}
          </div>
        </div>
      ) : (
        <App roomId={room} handleClose={handleClose} />
      )}
    </div>
  );
};