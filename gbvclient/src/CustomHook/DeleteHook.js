import { useState } from 'react';
import axiosInstance from "../Util/Axios";

export const useDeleteData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async () => {
    setLoading(true);
    try {
      await axiosInstance.delete(url);
      setError(null); // Clear error on successful deletion
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "An error occurred. Please try again later.");
      } else {
        setError("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteData };
};
