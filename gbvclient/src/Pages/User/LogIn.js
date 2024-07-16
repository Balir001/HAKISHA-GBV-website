import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PasswordResetEmail from '../PasswordResetEmail';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false); // Add state for showing reset password
  const [focusedField, setFocusedField] = useState(null); // State to track focused field

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
  
    setLoading(true);
    setError(null); // Reset the error state
  
    const data = { email: email, password: password };
  
    axios.post('http://localhost:3001/hakisha/user/Login', data)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        navigate('/User');
      })
      .catch((error) => {
        console.error('Error during login:', error);
  
        if (!error.response) {
          // Network error (server is down or no internet connection)
          setError('Service not available.Please try again later.');
        } else if (error.response.status === 401) {
          // Unauthorized (invalid credentials)
          setError('Invalid email and password combination');
        } else {
          // Other server errors
          setError('An unexpected error occurred. Please try again later.');
        }
        
        setShowResetPassword(true); // Show reset password option on error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUserCreation = () => {
    navigate('/CreateUser');
  };

  const handlePasswordResetEmail = () => {
    navigate('/SubmitPasswordResetEmail'); // Navigate to reset password route
  };

  return (
    <div className="Login">
      <form className="form-login" onSubmit={handleLogin}>
        <h6 style={{ color: 'green' }}>Login to get started</h6>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          required
          error={error && !email}
          sx={{ borderColor: focusedField === 'email' ? 'blue' : 'initial' }} // Conditional border color
        />
        <br></br>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
          required
          error={error && !password}
          sx={{ borderColor: focusedField === 'password' ? 'blue' : 'initial' }} // Conditional border color
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {showResetPassword && (
          <div className="button-container">
          <p>
            Forgot your password?
            <Button onClick={handlePasswordResetEmail}  color="primary">
              Reset Password
            </Button>
          </p>
           </div>
        )}
        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <p>
          Not yet registered? 
          <Button onClick={handleUserCreation} color="primary">
            SignUp
          </Button>
        </p>
      </form>
    </div>
  );
};
