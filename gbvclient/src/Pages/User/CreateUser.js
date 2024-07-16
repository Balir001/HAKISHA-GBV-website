import React, { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

export const CreateUser = () => {
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [confirmPasswordData, setConfirmPasswordData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState(null); // State to track focused field

  const handleInputChange = (e) => {
    setEmailData(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordData(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPasswordData(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFollowUpSubmit = () => {
    // Reset error and success messages
    setError(null);
    setSuccessMessage("");

    // Validate email format
    if (!validateEmail(emailData)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check if passwords are provided
    if (!passwordData || !confirmPasswordData) {
      setError("Please enter both password and confirm password.");
      return;
    }

    // Check if passwords match
    if (passwordData !== confirmPasswordData) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    
    // Check password length
    if (passwordData.length < 8) {
      setError("Password should be 8 characters or more");
      return;
    }

    setLoading(true);
    // Submit follow-up details immediately
    axios
      .post("http://localhost:3001/hakisha/user", {
        email: emailData,
        password: passwordData,
      })
      .then(() => {
        setSuccessMessage("User account created successfully! lets take you to the login screen");
        // Show success message for a few seconds before navigating
        setTimeout(() => {
          navigate('/Login');
        }, 3000); // 3 seconds delay
        console.log("Follow-up details submitted successfully!");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setError(error.response.data.error); // Access error message from response data
        } else {
          setError("An error occurred. Please try again later.");
        }
        console.error("Error submitting follow-up details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="follow-up">
      {/* Follow-up form */}
      <form className="form-usercreation">
        <h4 style={{ color: "green" }}>Register with us your Follow-up Account</h4>
        <TextField
          label="Email"
          variant="outlined"
          value={emailData}
          onChange={handleInputChange}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          required
          error={error && !validateEmail(emailData)}
          sx={{ borderColor: focusedField === 'email' ? 'blue' : 'initial' }} // Conditional border color
        />
        <br />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={passwordData}
          onChange={handlePasswordChange}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
          required
          error={error && !passwordData}
          sx={{ borderColor: focusedField === 'password' ? 'blue' : 'initial' }} // Conditional border color
        />
        <br />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPasswordData}
          onChange={handleConfirmPasswordChange}
          onFocus={() => setFocusedField('confirmPassword')}
          onBlur={() => setFocusedField(null)}
          required
          error={error && !confirmPasswordData}
          sx={{ borderColor: focusedField === 'confirmPassword' ? 'blue' : 'initial' }} // Conditional border color
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <div className="button-container">
          <Button
            type="button"
            variant="contained"
            className="small-button"
            color="primary"
            startIcon={<SendIcon />}
            onClick={handleFollowUpSubmit}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
};
