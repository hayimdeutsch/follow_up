import React, { useState, useEffect } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import LogoutButton from "../components/LogoutButton";
import TeacherDashboard from "../components/TeacherDashboard";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/user", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.firstName);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleAdminLoginClick = () => {
    setShowAdminLogin(true);
  };

  const handleAdminLoginClose = () => {
    setShowAdminLogin(false);
  };

  return (
    <div>
      {user ? (
        <>
          <TeacherDashboard user={user} />
          <LogoutButton />
        </>
      ) : (
        <>
          {!showAdminLogin && (
            <GoogleLoginButton redirectUrl="http://localhost:5173" />
          )}
          <button onClick={handleAdminLoginClick}>Admin Login</button>
          {showAdminLogin && (
            <div className="admin-login-popup">
              <div className="admin-login-content">
                <button
                  onClick={handleAdminLoginClose}
                  className="close-button"
                >
                  X
                </button>
                <GoogleLoginButton
                  redirectUrl="http://localhost:5173"
                  isAdmin={true}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
