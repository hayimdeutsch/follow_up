import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useProtectedFetch from "../hooks/useProtectedFetch";
import AddStudentForm from "./AddStudentForm";
import StudentTable from "./StudentTable";

const TeacherDashboard = ({ user }) => {
  const [trigger, setTrigger] = useState(0);
  const {
    data: students,
    error,
    loading,
  } = useProtectedFetch("/students", trigger);

  const refresh = () => {
    setTrigger((prev) => prev + 1);
  };

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome, {user}!
        </Typography>
        <Typography variant="body1" gutterBottom>
          You are successfully signed in! This is your home to manage students.
        </Typography>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
          <Box flex={1}>
            <Typography variant="h5" gutterBottom>
              Students
            </Typography>
            {loading && <Typography>Loading...</Typography>}
            {error && (
              <Typography color="error">Error: {error.message}</Typography>
            )}
            <StudentTable students={students} triggerRefresh={refresh} />
          </Box>
          <Box flex={1}>
            <AddStudentForm teacher={user} triggerRefresh={refresh} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TeacherDashboard;
