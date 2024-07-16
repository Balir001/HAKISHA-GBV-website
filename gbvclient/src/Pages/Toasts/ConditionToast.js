import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ReportToast = ({ message, navigateTo }) => {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate(navigateTo);
    toast.dismiss(customToast.toastId);
  };

  const handleNo = () => {
    toast.dismiss(customToast.toastId);
  };

  const customToast = toast(
    <div>
      <p>{message}</p>
      <div>
        <button onClick={handleYes}>Yes</button>
        <button onClick={handleNo}>No</button>
      </div>
    </div>,
    {
      autoClose: false,
      closeButton: false,
    }
  );

  return null;
};

export default ReportToast;