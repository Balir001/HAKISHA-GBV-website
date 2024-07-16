import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { usePostData } from "../../CustomHook/posthooks";
import { useGetData } from "../../CustomHook/GetHook";
import "./Conversation.css";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';

const Chat = ({ socket, roomId,handleClose }) => {
  const navigate = useNavigate();
  console.log("Received room prop:", roomId);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [profile, setProfile] = useState([]);
  const [refreshChat, setRefreshChat] = useState(false);

 

  // Fetch users to make sessions by mode of violence
  const { data: profileData, loading, error, fetchData } = useGetData(`user/getProfile`);

  // Fetch CounversationMessages
  const { data: conversation, loading: loadingConversation, error: errorFetchingConversation, fetchData: fetchConversation } = useGetData(`chat/getConversation?roomId=${roomId}`);

  // Post support seeker id to initiate a room
  const { data, loading: loadingRoomId, error: errorLoadingRoomId, postData: uploadMessage } = usePostData("chat/uploadMessage");

  console.log(errorFetchingConversation);
  console.log(conversation);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: roomId,
        authorId: profile?.id,
        author: profile?.firstName,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        formattedTime: `${new Date(Date.now()).getHours().toString().padStart(2, '0')}.${new Date(Date.now()).getMinutes().toString().padStart(2, '0')}`,
      };
      console.log(`the room is:${roomId}`);

      const profileId = profile.id;

      await uploadMessage({ roomId, currentMessage, profileId }); // Posting message

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    // Set profile when profileData is fetched
    if (profileData) {
      setProfile(profileData);
    }
    console.log(profileData);
  }, [profileData]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log("Received message:", data); // Log the received message
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    // Log when the component mounts
    console.log("Chat component mounted");

    // Log the socket connection status
    console.log("Socket connected:", socket.connected);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  useEffect(() => {
    fetchMyConversation();
  }, [roomId, refreshChat]);

  const fetchMyConversation = async () => {
    if (loadingConversation) {
      // Show a loading indicator or message
      console.log("Fetching conversation messages...");
      return;
    }

    if (errorFetchingConversation) {
      // Handle the error case
      console.error("Error fetching conversation messages:", errorFetchingConversation);
      return;
    }

    if (conversation && conversation.conversations) {
      const combinedMessages = [];

      conversation.conversations.forEach((conversation) => {
        const conversationMessages = conversation.messages.map((message) => {
          const sentAtDate = new Date(message.sentAt);
          const formattedTime = `${sentAtDate.getHours().toString().padStart(2, '0')}.${sentAtDate.getMinutes().toString().padStart(2, '0')}`;

          return {
            ...message,
            author: `${conversation.profile.firstName}`,
            authorId: `${conversation.profile.id}`,
            formattedTime,
          };
        });

        combinedMessages.push(...conversationMessages);
      });

      combinedMessages.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));
      setConversationMessages(combinedMessages);
    }
  };

  const handleRefreshChat = () => {
    setRefreshChat(true);
    fetchMyConversation();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setRefreshChat(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [refreshChat]);

  return (
    <div className="chat-window">
      <div className="chat-header">
         
         <IconButton onClick={handleClose}>
  <CloseIcon sx={{ color: 'red' }} />
</IconButton>
       
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {[...conversationMessages, ...messageList].map((messageContent) => {
            return (
              <div className="message" id={profile?.id === messageContent.authorId ? "you" : "other"}>
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.formattedTime}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {!refreshChat && (
            <Button
              className="refresh-button"
              onClick={handleRefreshChat}
              startIcon={<RefreshIcon />}
            >
            
            </Button>
          )}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
        
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <Button variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>
        </Button>
      </div>
    </div>
  );
};

export default Chat;