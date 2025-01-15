import React, { useState, useEffect } from "react";
import LogoutButton from "../components/LogoutButton";
import TeacherDashboard from "../components/TeacherDashboard";

import useAuthenticatedFetch from "../hooks/useAuthenticatedFetch.js";

const HomePage = () => {
  const {
    data: user,
    loading,
    error,
  } = useAuthenticatedFetch("http://localhost:3000/auth/user");
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {user && <TeacherDashboard user={user.firstName} />}
      {user && <LogoutButton />}
    </>
  );
};

export default HomePage;
