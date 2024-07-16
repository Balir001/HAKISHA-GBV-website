import { useState } from 'react';
import axiosInstance from '../Util/Axios';

export const useUpdateData = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (updatedData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(url, updatedData);
      setData(response.data);
      setError(null); // Clear error on successful response
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

  return { data, loading, error, updateData };
};
