import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { frontendUrl, backendUrl } from "./config.js";
import { api } from "./config.js";
import { normalizeUrl } from "../services/utils.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasCheckedAuth = useRef(false);

  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/check");
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasCheckedAuth.current) {
      checkAuth();
      hasCheckedAuth.current = true;
    }
  }, []);

  const login = async (email, isAdmin, redirectURL) => {
    try {
      let res = null;
      if (isAdmin) {
        res = await api.post("admin/check-admin", { email });
      } else {
        res = await api.post("/auth/check-approved", { email });
      }
      const returnUrl = redirectURL
        ? redirectURL
        : isAdmin
        ? `${frontendUrl}/admin`
        : `${frontendUrl}`;

      window.location.href = `${backendUrl}/auth/google?returnTo=${encodeURIComponent(
        returnUrl
      )}`;
    } catch (error) {
      const message = error?.response?.data?.message || "Login Failed";
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
      setIsAuthenticated(false);
    } catch (error) {
      throw new Error("Login failed");
    } finally {
      navigate("/login");
    }
  };

  const redirectToLogin = (redirectTo) => {
    if (
      !redirectTo ||
      frontendUrl === normalizeUrl(redirectTo) ||
      `${frontendUrl}/login` === normalizeUrl(`${redirectTo}/`)
    ) {
      navigate("/login");
    } else {
      navigate(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        logout,
        redirectToLogin,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
