import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUpdateData } from '../CustomHook/updatehooks';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';

const PasswordReset = () => {
  
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {data, loading, error: updateError, updateData } = useUpdateData('/user/updatePassword', { otp, password });
  const navigate = useNavigate();

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'otp' && value.length <= 6) {
      setOTP(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };
   
  const showToast = () => {
    const toastId = toast('Password Reset Successful', { autoClose: true, toastId: 'successPasswordReset' });
    return () => {
      toast.dismiss(toastId);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
     
    if (otp.length === 6) {
      try {
        await updateData({ otp, password });
        if(data){
          showToast();
        }
        
        setTimeout(() => {
          navigate('/Login');
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
      <h2>Password Reset</h2>
      <input type="text" name="otp" value={otp} onChange={handleChange} placeholder="Enter OTP" maxLength="6" required />
      <input type="password" name="password" value={password} onChange={handleChange} placeholder="Enter new password" minLength="8" required />
      <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} placeholder="Confirm new password" minLength="8" required />
      <Button type="submit" disabled={loading} variant="contained" color="primary">
      Submit
    </Button>
      {updateError && <p>Error: {updateError}</p>}
    </form>
  );
};

export default PasswordReset;