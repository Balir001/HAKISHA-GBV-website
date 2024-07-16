import { LogOut } from "../LogOut";
import { ViewProfile } from "../ViewProfle";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";

export const SuperManagerComponent = () => {
  return (
    <div className="profileView">
      <ViewProfile />
      <div className="acessories" >
      <h4>Accessories:</h4>
      <Tooltip title="View Dashboard"  >
        <IconButton component={Link} to="/Dashboard">
          <DashboardIcon />
          
        </IconButton>
      </Tooltip>

      <Tooltip title="Enter Metadata" >
        <IconButton component={Link} to="/MetadataEntry">
          <AddCircleOutlineIcon />
          
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit Users" >
        <IconButton component={Link} to="/ManageUsers">
          <EditIcon />
          
        </IconButton>
      </Tooltip>

      <Tooltip title="Chat">
        <IconButton component={Link} to="/Mychats">
          <ChatIcon sx={{ color: ' blue' }} />
          
        </IconButton>
      </Tooltip>

      </div>

      
    </div>
  );
};
