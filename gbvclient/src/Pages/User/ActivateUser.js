import React, { useState, useEffect } from 'react';
import { usePostData } from '../../CustomHook/posthooks';
import { useNavigate } from 'react-router-dom';
import { useGetData } from '../../CustomHook/GetHook';
import { ToastContainer, toast } from 'react-toastify'; // Import the main object
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';

const OTPInput = () => {
  const { loading: activationLoading, error: activationError, fetchData: fetchActivation } = useGetData('user/sendActivationOTP');
  const [otp, setOTP] = useState('');
  const { loading, error: submitError, postData } = usePostData('/user/userActivation');
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchActivation();
  }, []); // Fetch activation OTP data only once when the component mounts

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setOTP(value);
    }
  };

  const showToast = () => {
    const toastId = toast('Account Activation Sucess', { autoClose: true, toastId: 'successActivation' });
    
        // Clean up function to dismiss 'success1' toast when the component unmounts (page change)
        return () => {
          toast.dismiss(toastId); // Dismisses the toast with the given toastId
        };
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      try {
        await postData({ otp });
        
        showToast();
        setTimeout(() => {
          navigate('/User');
        }, 3000); 
      } catch (error) {
        
        console.error('Error:', error);
      }
    } else {
      alert('Please enter a 6-character OTP.');
    }
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <h2>Enter Activation OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={handleChange}
        placeholder="Enter OTP"
        maxLength="6"
        required
      />
       <Button type="submit" disabled={loading} variant="contained" color="primary">
      Submit
    </Button>
      
      {loading && <p>Loading...</p>}
      {activationLoading && <p>Sending activation OTP...</p>}
      {activationError && (
       <div className='activation-Message'> <b>Message:</b> <p style={{color:"green", display:"inline"}}>{activationError}</p></div> 
      )}
     
    </form>
  );
};

export default OTPInput;
