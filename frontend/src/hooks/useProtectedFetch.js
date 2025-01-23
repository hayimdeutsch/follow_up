import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { privateAxios } from "../config/config";
import { useAuth } from "../context/AuthContext";

const useProtectedFetch = (endpoint, trigger = null) => {
  const {
    isAuthenticated,
    checkAuth,
    redirectToLogin,
    loading: authLoading,
  } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const requestIntercept = privateAxios.interceptors.request.use(
      async (config) => {
        if (authLoading) return config;
        if (!isAuthenticated) {
          let initialUrl;
          if (!hasFetched.current) {
            initialUrl = window.location.href;
            hasFetched.current = true;
            redirectToLogin(initialUrl);
          }
          throw new axios.Cancel("Redirecting to login");
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          redirectToLogin();
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateAxios.interceptors.request.eject(requestIntercept);
      privateAxios.interceptors.response.eject(responseIntercept);
    };
  }, [checkAuth, isAuthenticated, redirectToLogin, authLoading]);

  useEffect(() => {
    if (!endpoint || authLoading) return;

    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        while (authLoading) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        if (!isAuthenticated) {
          const initialUrl = window.location.href;
          redirectToLogin(initialUrl);
          throw new Error("Redirecting to login");
        }

        const response = await privateAxios.get(endpoint, {
          signal: abortController.signal,
        });
        setData(response.data);
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError(error.response?.data?.message || "Internal Server Error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [
    endpoint,
    trigger,
    checkAuth,
    isAuthenticated,
    redirectToLogin,
    authLoading,
  ]);

  return { data, loading, error };
};

export default useProtectedFetch;
