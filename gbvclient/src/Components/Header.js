import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';


const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

// const StyledButton = styled(Button)(({ theme }) => ({
//   textTransform: 'none',
//   color: theme.palette.text.primary,
//   '&:hover': {
//     backgroundColor: theme.palette.primary.light,
//     color: theme.palette.primary.main,
//   },
// }));

const Header = () => {
  return (
    <header className='header'>
      <div className="logo">
        <StyledLink to="/">HAKISHA</StyledLink>
      </div>
      <nav className='hidden'>
        <ul className='hidden-ul' style={{ listStyleType: 'none' }}> {/* Add style here */}
          <li>
            <StyledLink to="/">Home</StyledLink>
          </li>
          <li>
            <StyledLink to="/Report">Report</StyledLink>
          </li>
          
          <li>
            <StyledLink to="/Login">Login</StyledLink>
          </li>
          <li>
            <StyledLink to="/about">About</StyledLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
