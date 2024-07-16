import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ReportIcon from '@mui/icons-material/Report';
// import ChatIcon from '@mui/icons-material/Chat';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';


const Sidenav = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = ({icon}) => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Navigate to the login page or any other desired route
    navigate('/Login');
  };

  return (
    <div className="sidenav">
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="sidenav-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/" onClick={handleClose}>
          <HomeIcon />
          Home
        </MenuItem>
        <MenuItem component={Link} to="/User" onClick={handleClose}>
          <PersonIcon />
          My Account
        </MenuItem>
        <MenuItem component={Link} to="/Report" onClick={handleClose}>
          <ReportIcon />
          Report a Crime
        </MenuItem>
        <MenuItem  onClick={handleLogout}>
          <ExitToAppIcon /> Log Out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Sidenav;
