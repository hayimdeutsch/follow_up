import React, { useState } from "react";

const GoogleLoginButton = ({ redirectUrl }) => {
  const [gmail, setGmail] = useState("");
  const [error, setError] = useState("");

  const loginUrl = `http://localhost:3000/auth/google?returnTo=${encodeURIComponent(
    redirectUrl
  )}`;

  const handleGoogleLogin = async () => {
    if (!gmail) {
      setError("Please enter your email");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/auth/check-approval",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gmail }),
        }
      );
      if (response.ok) {
        window.location.href = loginUrl;
      } else {
        setError("Login failed");
        console.error("Login failed, your account is not approved");
      }
    } catch (error) {
      setError("Login failed");
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setGmail(e.target.value);
    setError("");
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        value={gmail}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <button onClick={handleGoogleLogin}>Log in with Google</button>
    </div>
  );
};

export default GoogleLoginButton;
