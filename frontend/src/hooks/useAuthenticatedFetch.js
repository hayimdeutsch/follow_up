import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const useAuthenticatedFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const hasFetched = useRef(false);
  const initialUrl = useRef(window.location.href);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      setLoading(true);
      try {
        const response = await fetch(url, {
          credentials: "include",
          ...options,
        });
        if (response.status === 401) {
          navigate(
            `/login?redirectTo=${encodeURIComponent(initialUrl.current)}`
          );
        } else {
          const result = await response.json();
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options, navigate]);

  return { loading, data, error };
};

export default useAuthenticatedFetch;
