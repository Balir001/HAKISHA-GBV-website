import React from 'react';
import { useGetData } from '../../CustomHook/GetHook';
import { CreateProfileComponent } from './CreateUserProfile';
import { SupportSeekerComponent } from './SupportSeeker/SupportSeeker';
import { CounselorComponent } from './Councelor/Counselor';
import { ManagerComponent } from "./Manager/Manager"
import { SuperManagerComponent } from "./SuperManager/SuperManager"
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import '../Page.css'

import { ViewProfile } from './ViewProfle';
import { toast, ToastContainer}  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { CheckCircleOutline, CancelOutlined } from '@mui/icons-material'; // Import Material-UI icons



export const User = () => {
  const { data: user, loading, error, fetchData: fetchUserDetails } = useGetData('user/userDetails'); // Destructure fetchData from useGetData
  
  const navigate = useNavigate(); // Get the navigation function
  

 



 




 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error ) {
    return <div>Error: {error}</div>;
  }

   // Check if the user has a profile and a valid role
   const hasProfile = user && user.Profile && user.Profile.Role && user.Profile.Role.Role;

   // If the user doesn't have a profile and is active, navigate to the /CreateProfile route in 3secs
   if (user && user.Is_Active && !hasProfile) {
    setTimeout(() => {
     navigate("/CreateProfile");
    }, 4000); // 2000 milliseconds = 2 seconds
   }

  const renderProfileAndRole = () => {
    if (user.Is_Active) {
      const roleValue = user?.Profile?.Role?.Role || null;
  
      switch (roleValue) {
        case 'Support Seeker':
          return <SupportSeekerComponent />;
        case 'Counselor':
          return <CounselorComponent />;
        case 'Manager':
          return <ManagerComponent />;
        case 'Super Manager':
          return <SuperManagerComponent />;
        default:
          return <div className='User-Profile-div'> 
          <p>Your profile looks Empty
      </p>
            <ViewProfile/>
          </div>;
      }
    } else{
     return <div className='User-Profile-div'> 
     <p>Your profile looks Empty
      </p> <ViewProfile/>
      {!user.Is_Active && (
            <Button variant="contained" color="success" onClick={() => navigate('/ActivateUser')}>
              Activate Account
            </Button>
          )}
      </div>

    
    }
    
  };

  return (
    <div className='account'>
      <h5>Account</h5>
      <p>Email: {user.Email}</p>
      <p>Account Status: {user.Is_Active ? <span style={{ color: 'green' }}>
             <CheckCircleOutline />
          </span> : 
          <span style={{ color: 'red' }}>
           <CancelOutlined />
          </span>}</p>
     
  
      {renderProfileAndRole()}
      
    </div>
  );
};
