import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const redirectURL =
    searchParams.get("redirectTo") || "/http://localhost:5173";
  const [gmail, setGmail] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleGmailChange = (e) => {
    setError("");
    setGmail(e.target.value);
  };

  const handleGoogleLogin = async () => {
    if (!gmail) {
      setError("Please enter a valid Gmail account");
      return;
    }
    try {
      const checkUrl = isAdmin
        ? "http://localhost:3000/admin/check-admin"
        : "http://localhost:3000/auth/check-approval";
      const response = await fetch(checkUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gmail }),
      });
      if (response.ok) {
        window.location.href = `http://localhost:3000/auth/google?returnTo=${encodeURIComponent(
          redirectURL
        )}`;
      } else {
        const result = await response.json();
        setError(result.message || "Login failed");
      }
    } catch (error) {
      setError("Login failed");
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
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default LoginPage;
