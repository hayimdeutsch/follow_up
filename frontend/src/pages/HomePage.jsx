import React, { useState, useEffect } from "react";
import useProtectedFetch from "../hooks/useProtectedFetch";
import TeacherDashboard from "../components/TeacherDashboard";
import LogoutButton from "../components/LogoutButton";

const HomePage = () => {
  const { data: user, loading, error } = useProtectedFetch("/auth/user");

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {user && <TeacherDashboard user={user.firstName} />}
      {user && <LogoutButton />}
    </>
  );
};

export default HomePage;
