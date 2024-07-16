import { useNavigate } from "react-router-dom";
import { CounselorProfile } from "./CounselorProfile";
import { LogOut } from "../LogOut";
// import { LogOut } from "./LogOut";
import { IconButton, Tooltip } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { ViewProfile } from "../ViewProfle";
// import EditIcon from "@mui/icons-material/Edit";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';


export const CounselorComponent = () => {
  return (
    <div className="profileView">
      <ViewProfile />

      <div>

        <h4>Accessories:</h4>

        <Tooltip title="Select cases" >
        <IconButton component={Link} to="/FilterCases">
        <FilterListIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Chat" >
        <IconButton component={Link} to="/Mychats">
          <ChatIcon />
        </IconButton>
      </Tooltip>

      <Tooltip  title="DashBoard" >
        <IconButton component={Link} to="/Dashboard">
          <DashboardIcon />
          
        </IconButton>
      </Tooltip>

      </div>

      
    </div>
  );
};
