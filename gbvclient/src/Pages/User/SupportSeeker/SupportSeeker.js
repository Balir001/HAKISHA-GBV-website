import React from "react";

import { ViewProfile } from "../ViewProfle";

import { IconButton, Tooltip } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";


import { Link } from "react-router-dom";

export const SupportSeekerComponent = () => {
  return (
    <div className="profileView">
      <ViewProfile />
      <div className="acessories">
      <h4>Accessories:</h4>
      <Tooltip title="Chat">
        <IconButton component={Link} to="/Mychats">
          <ChatIcon sx={{ color: ' blue' }} />
          
        </IconButton>
      </Tooltip>
      </div>

      
    </div>
  );
};
