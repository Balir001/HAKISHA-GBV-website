// YesLink.js
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const YesLink = () => {
  const handleClick = () => {
    toast.dismiss(); // Dismiss the toast
    // Redirect to the desired route
  };

  return (
    <Link to="/CreateUser" onClick={handleClick} style={{ textDecoration: 'none' }}>
      Yes
    </Link>
  );
};

export default YesLink;