import { useState, useEffect, useCallback } from "react";
import { privateAxios } from "../config/config";
import { useAuth } from "../config/AuthContext";

const useProtectedApi = () => {
  const {
    isAuthenticated,
    checkAuth,
    redirectToLogin,
    loading: authLoading,
  } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestIntercept = privateAxios.interceptors.request.use(
      async (config) => {
        if (authLoading) return config;
        if (!isAuthenticated) {
          redirectToLogin();
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
  }, [checkAuth, isAuthenticated, redirectToLogin, authLoading]);

  const executeRequest = useCallback(
    async (endpoint, method = "POST", requestData = null) => {
      setLoading(true);

      try {
        if (!endpoint) return;

        while (authLoading) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        if (!isAuthenticated) {
          const initialUrl = window.location.href;
          redirectToLogin(initialUrl);
          throw new Error("Redirecting to login");
        }

        const config = {
          method,
          url: endpoint,
          ...(method !== "DELETE" && { data: requestData }),
        };

        const response = await privateAxios(config);

        setData(response.data);
      } catch (err) {
        const errMsg = err?.response?.data?.message || "Internal Server Error";
        throw new Error(errMsg);
      } finally {
        setLoading(false);
      }
    },
    [checkAuth, isAuthenticated, redirectToLogin]
  );

  return { data, loading, executeRequest };
};

export default useProtectedApi;
