import { useState, useEffect } from "react";
import axiosInstance from "../Util/Axios";

export const useGetData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response ? error.response.data.error : "Network error. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts or the URL changes
  }, [url]);

  return { data, loading, error, fetchData }; // Return fetchData function
};
