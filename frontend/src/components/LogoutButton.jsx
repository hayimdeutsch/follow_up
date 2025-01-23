import React from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../config/config.js";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${backendUrl}/auth/logout`, {
        credentials: "include",
      });
      if (response.ok) {
        navigate("/", { replace: true });
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
