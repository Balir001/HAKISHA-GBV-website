import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostData } from '../CustomHook/posthooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const PasswordResetEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const {data, loading, error, postData } = usePostData('/user/sendPasswordActivationOTP');
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Regular expression for email validation
    const emailPattern = /^\S+@\S+\.\S+$/;
    const isValidEmail = emailPattern.test(email);
    setIsValid(isValidEmail);

    if (isValidEmail) {
      setIsSubmitting(true);
      try {
        await postData({email});
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Invalid email format');
    }
  };

  useEffect(() => {
    if (data) {
      toast.success('Email sent successfully, check your email!');
      setTimeout(() => {
        navigate('/ResetPassword');
      }, 3000);
    }
  }, [data, navigate]);

  return (
    <form className='passwordResetEmail' onSubmit={handleSubmit}>
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={handleInputChange}
        error={!isValid}
        helperText={!isValid ? 'Invalid email format' : ''}
        disabled={isSubmitting}
      />
      <br />
      <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default PasswordResetEmail;