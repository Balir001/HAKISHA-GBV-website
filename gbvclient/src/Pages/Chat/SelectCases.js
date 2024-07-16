import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetData } from "../../CustomHook/GetHook.js";
import { usePostData } from "../../CustomHook/posthooks.js";
import "./Conversation.css"
import App from './App.js';
import { CasesTable } from "./CasesTable.js";
import './Conversation.css'



export const SelectCases = () => {
  const [showChat, setShowChat] = useState(false);
  const [showTable, setShowTable] = useState(true);
  // const [mode, setMode] = useState("");
  const [room, setRoom] = useState("");
  const [profile,setProfile]=useState("")

  const [mode, setSelectedMode] = useState(""); // State variable to store the selected Mode of Violence ID
  const [modeOptions, setModeOptions] = useState([]); // State variable to store the options for Mode of Violence
   
 

  const navigate = useNavigate();

  // Fetch users to make sessions by mode of violence
  const { data, loading, error } = useGetData(`user/search-profiles?mode=${mode}`);

  // Post support seeker id to initiate a room
  
  
  const { data: roomId, loading: loadingRoomId, error: errorLoadingRoomId, postData } = usePostData("chat/createRoom");


  const { data: roomMembers, loading: loadingRoomMemebers, error: errorLoadingRoomMumbers, postData:postRoomMembers } = usePostData("chat/submitRoomMember");
 

  useEffect(()=>{
    // Fetch Metadata: Mode of Violence
    axios
      .get("http://localhost:3001/hakisha/entry/getModeOfViolence")
      .then((response) => {
        setModeOptions(response.data); // Assuming response.data contains the mode of violence data

        // Do something with modeOfViolence
      })
      .catch((error) => {
        console.error("Error fetching Mode of Violence:", error);
      });
  },[])

  useEffect(() => {
    // This effect will run whenever the 'roomId' state changes
    if (roomId) {
      console.log(roomId);
      if (typeof roomId === 'object' && roomId.roomExists) {
        // Room already exists, skip creating a new room member
        setRoom(roomId.roomId);
        setShowChat(true);
        setShowTable(false)
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
  
      if (roomId && typeof roomId === 'object' && roomId.roomExists) {
        // Room already exists, skip creating a new room member
        setShowChat(true);
        setShowTable(false)
      } else {
        // Call postRoomMembers with the payload
        postRoomMembers({ messageReceiverId, room });
        setShowChat(true);
        setShowTable(false)
      }
    }
  }, [room]);
  
 
 



  useEffect(() => {
    // This effect will run whenever the 'mode' state changes
  }, [mode, showChat]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const handleModeChange = (event) => {
  //   setMode(event.target.value);
  // };

  const handleClose = () => {
    // logic to close chat
    setShowTable(true); // Set showChat to false to close the chat
  };

  const handleChat = async (profile) => {
    try {
      // Post the profile data to create a room
      await postData({ profile });
       setProfile(profile.id)

       
    } catch (error) {
      console.error("Error creating room:", error);
    }
   
  };


 

  return (
    <div className="Councelor-chat">
      {showTable?(

<div className="Table-Screen">
      <label >
          Mode of violence:
          <select
            value={mode}
            onChange={(e) => setSelectedMode(e.target.value)}
          >
            <option value="">Select...</option>
            {modeOptions.map((mode) => (
              <option key={mode.id} value={mode.Mode}>
                {mode.Mode}
              </option>
            ))}
          </select>
        </label>
        
      <div  className="Scroll-case">
        {data.length > 0 ? (
          <CasesTable data={data} handleClose={handleClose} handleChat={handleChat} />
        ) : (
          <div className="Victim-Profile border-blue">No data</div>
        )}
      </div>
      </div>
      
    ):(
      
          // Render the Conversation component here
          <App roomId={room} handleClose={handleClose}  />
        )}
    </div>
  );
};