import React, { useState } from "react";

const AdminLogin = ({ onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle admin login logic here
    try {
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        onClose();
      } else {
        alert("Failed to log in as admin");
      }
    } catch (error) {
      console.error("Error logging in as admin:", error);
    }
  };

  return (
    <div className="admin-login-popup">
      <div className="admin-login-content">
        <button onClick={onClose} className="close-button">
          X
        </button>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
