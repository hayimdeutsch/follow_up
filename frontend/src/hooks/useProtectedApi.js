import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { privateAxios } from "../services/api";
import { useAuth } from "../context/AuthContext";

const useProtectedApi = (endpoint, method = "POST") => {
  const { isAuthenticated, checkAuth, redirectToLogin } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeRequest = useCallback(
    async (requestData = null) => {
      setLoading(true);
      setError(null);

      try {
        await checkAuth();
        if (!isAuthenticated) {
          const initialUrl = window.location.href;
          redirectToLogin(initialUrl);
          throw new Error("Redirecting to login");
        }

        const response = await privateAxios({
          method,
          url: endpoint,
          data: requestData,
        });

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [checkAuth, isAuthenticated, redirectToLogin, endpoint, method]
  );

  useEffect(() => {
    const requestIntercept = privateAxios.interceptors.request.use(
      async (config) => {
        await checkAuth();
        if (!isAuthenticated) {
          const initialUrl = window.location.href;
          redirectToLogin(initialUrl);
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
          const initialUrl = window.location.href;
          redirectToLogin(initialUrl);
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateAxios.interceptors.request.eject(requestIntercept);
      privateAxios.interceptors.response.eject(responseIntercept);
    };
  }, [checkAuth, isAuthenticated, redirectToLogin]);

  return { data, loading, error, executeRequest };
};

export default useProtectedApi;
