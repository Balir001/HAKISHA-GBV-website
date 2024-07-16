import { ViewProfile } from "../ViewProfle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import FilterListIcon from '@mui/icons-material/FilterList';

export const ManagerComponent = () => {
 

  return (
    <div className="Bio">
    
      <ViewProfile />
      <div className="acessories">
      <Tooltip title="View Dashboard"  >
        <IconButton component={Link} to="/Dashboard">
          <DashboardIcon />
          
        </IconButton>
      </Tooltip>
      <Tooltip title="Search roles"  >
        <IconButton component={Link} to="/Feedbackchats">
          <FilterListIcon />
          
        </IconButton>
      </Tooltip>
     
      <Tooltip title="Chat" >
        <IconButton component={Link} to="/Mychats">
          <ChatIcon />
        </IconButton>
      </Tooltip>
      </div>
       
     
     
      
    </div>
  );
};