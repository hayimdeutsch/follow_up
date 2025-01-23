import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const redirectURL = searchParams.get("redirectTo");
  const [gmail, setGmail] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleGmailChange = (e) => {
    setError("");
    setGmail(e.target.value);
  };

  const handleGoogleLogin = async () => {
    if (!gmail.includes("gmail.com")) {
      setError("Please enter a valid Gmail account");
      return;
    }
    try {
      login(gmail, isAdmin, redirectURL);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        value={gmail}
        autoComplete="email"
        onChange={handleGmailChange}
        placeholder="Enter your email"
      />
      <input
        type="checkbox"
        checked={isAdmin}
        onChange={(e) => setIsAdmin(e.target.checked)}
      />
      <label>Admin</label>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <button onClick={handleRegisterClick}>Register</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default LoginPage;
