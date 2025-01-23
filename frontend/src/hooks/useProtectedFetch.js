// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { privateAxios } from "../config/config";

// const useProtectedFetch = (endpoint, refresh = []) => {
//   const { isAuthenticated, checkAuth, redirectToLogin } = useAuth();
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const requestIntercept = privateAxios.interceptors.request.use(
//       async (config) => {
//         await checkAuth();
//         if (!isAuthenticated) {
//           const initialUrl = window.location.href;
//           redirectToLogin(initialUrl);
//           throw new axios.Cancel("Redirecting to login");
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     const responseIntercept = privateAxios.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         if (error.response.status === 401) {
//           const initialUrl = window.location.href;
//           redirectToLogin(initialUrl);
//           return Promise.reject(error);
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       privateAxios.interceptors.request.eject(requestIntercept);
//       privateAxios.interceptors.response.eject(responseIntercept);
//     };
//   }, [checkAuth, isAuthenticated, redirectToLogin]);

//   useEffect(() => {
//     if (!endpoint) return;

//     const abortController = new AbortController();

//     const fetchData = async () => {
//       try {
//         const response = await privateAxios.get(endpoint, {
//           signal: abortController.signal,
//         });
//         setData(response.data);
//         setError(null);
//       } catch (error) {
//         if (!abortController.signal.aborted) {
//           setError(error);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//     return () => {
//       abortController.abort();
//     };
//   }, [endpoint, refresh]);

//   return { data, loading, error };
// };

// export default useProtectedFetch;

// import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { privateAxios } from "../config/config";
// import { useAuth } from "../context/AuthContext";

// const useProtectedFetch = (endpoint, trigger = null) => {
//   const { isAuthenticated, checkAuth, redirectToLogin,} = useAuth();
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const executeFetch = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       await checkAuth();
//       if (!isAuthenticated) {
//         const initialUrl = window.location.href;
//         redirectToLogin(initialUrl);
//         throw new Error("Redirecting to login");
//       }

//       const response = await privateAxios.get(endpoint);
//       setData(response.data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [checkAuth, isAuthenticated, redirectToLogin, endpoint]);

//   useEffect(() => {
//     const requestIntercept = privateAxios.interceptors.request.use(
//       async (config) => {
//         await checkAuth();
//         if (!isAuthenticated) {
//           const initialUrl = window.location.href;
//           redirectToLogin(initialUrl);
//           throw new axios.Cancel("Redirecting to login");
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     const responseIntercept = privateAxios.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         if (error.response.status === 401) {
//           const initialUrl = window.location.href;
//           redirectToLogin(initialUrl);
//           return Promise.reject(error);
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       privateAxios.interceptors.request.eject(requestIntercept);
//       privateAxios.interceptors.response.eject(responseIntercept);
//     };
//   }, [checkAuth, isAuthenticated, redirectToLogin]);

//   useEffect(() => {
//     if (!endpoint) return;

//     const abortController = new AbortController();

//     const fetchData = async () => {
//       try {
//         await executeFetch();
//       } catch (error) {
//         if (!abortController.signal.aborted) {
//           setError(error);
//         }
//       }
//     };

//     fetchData();

//     return () => {
//       abortController.abort();
//     };
//   }, [endpoint, trigger, executeFetch]);

//   return { data, loading, error };
// };

// export default useProtectedFetch;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { privateAxios } from "../config/config";
import { useAuth } from "../context/AuthContext";

const useProtectedFetch = (endpoint, trigger = null) => {
  const { isAuthenticated, checkAuth, redirectToLogin, loading } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestIntercept = privateAxios.interceptors.request.use(
      async (config) => {
        if (loading) return config; // Wait until loading is false
        await checkAuth();
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
  }, [checkAuth, isAuthenticated, redirectToLogin, loading]);

  useEffect(() => {
    if (!endpoint || loading) return;

    const abortController = new AbortController();

    const fetchData = async () => {
      setFetchLoading(true);
      setError(null);

      try {
        await checkAuth();
        if (!isAuthenticated) {
          redirectToLogin();
          throw new Error("Redirecting to login");
        }

        const response = await privateAxios.get(endpoint, {
          signal: abortController.signal,
        });
        setData(response.data);
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError(error);
        }
      } finally {
        setFetchLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [endpoint, trigger, checkAuth, isAuthenticated, redirectToLogin, loading]);

  return { data, loading: fetchLoading, error };
};

export default useProtectedFetch;
