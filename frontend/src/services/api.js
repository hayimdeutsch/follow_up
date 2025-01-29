import axios from "axios";
import { backendUrl } from "../config/config.js";
import { useAuth } from "../config/AuthContext.jsx";

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const protectedApi = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

protectedApi.interceptors.request.use(
  async (config) => {
    const { isAuthenticated, checkAuth, redirectToLogin } = useAuth();
    await checkAuth();
    if (!isAuthenticated) {
      const initialUrl = window.location.href;
      redirectToLogin(initialUrl);
      throw new axios.Cancel("Reidrecting to login");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

protectedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const initialUrl = window.location.href;
      const { redirectToLogin } = useAuth();
      redirectToLogin(initialUrl);
    }
    return Promise.reject(error);
  }
);

export { api, protectedApi };
