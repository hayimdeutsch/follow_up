import { useState, useEffect, useRef } from "react";
import { api } from "../config/config";

const useFetch = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      setLoading(true);
      try {
        const response = await api.get(endpoint, options);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error.response.data.message || "Internal Server Error";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchData();
  }, [api, endpoint, options]);

  return { loading, data, error };
};

export default useFetch;
