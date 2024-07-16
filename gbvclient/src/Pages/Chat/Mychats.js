import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useGetData } from "../../CustomHook/GetHook.js";
import { ChatsTable } from "./ChatsTable.js";
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Tooltip from '@mui/material/Tooltip';


import "./Conversation.css";
import App from "./App.js";

export const MyChats= () => {
  // const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  // Fetch chats with providers
  const { data, loading, error, fetchData } = useGetData(`/chat/searchChats`);
 console.log(data)
  useEffect(() => {
    if (data || refresh) {
      setSession(data);
      if (refresh) {
        fetchData();
        setRefresh(false); // Reset the refresh state after fetching data
      }
    }
  }, [data, refresh, fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleRefresh = () => {
    setRefresh(!refresh); // Toggle the 'refresh' state to trigger a re-fetch
  };


  const handleClose = () => {
    setShowTable(true);
    
  };

  const handleChat = async (profile) => {
    
    
    console.log(profile.roomId);
    setRoom(profile.roomId); // Set the room based on the profile
    console.log(room)
    setShowChat(true);
    setShowTable(false)
    
  };

  return (
    <div className="Councelor-chat">
      {showTable?(

        <div className="Table-Screen">
          <div className="Search-select">
          <Tooltip title="Refresh chats">
          <IconButton onClick={handleRefresh}><RefreshIcon /> </IconButton>
          </Tooltip>
        </div>
      <div className="Scroll-case">
        
      
        {session?.length > 0 ? (
        <ChatsTable data={session} handleClose={handleClose} handleChat={handleChat} />
      ) : (
        <div className="Victim-Profile border-blue">No Chats</div>
      )}
      </div>
      </div>
      
    ):(
      
          <App roomId={room} handleClose={handleClose}  />
      )}
    </div>
  );
};
