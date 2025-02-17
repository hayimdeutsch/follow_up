import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import ScheduledEmailsManager from "../components/ScheduledEmailsManager";
import FollowupsManager from "../components/FollowupsManager";
import useProtectedFetch from "../hooks/useProtectedFetch";

const StudentPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("id");
  const {
    data: student,
    loading,
    error,
  } = useProtectedFetch(`/students/${studentId}`, refreshTrigger);

  useEffect(() => {
    console.log("StudentPage mounted");
    console.log(studentId);
    return () => {
      console.log("StudentPage unmounted");
    };
  }, []);

  const refresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 3 }}>
        Error loading student data.
      </Typography>
    );
  }
  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        mt: 4,
        p: 2,
        bgcolor: "enfold-main-color-bg",
      }}
    >
      <Paper
        sx={{
          p: 2,
          mb: 3,
          bgcolor: "enfold-footer-color-primary",
          color: "white",
        }}
      >
        <Typography variant="h4" color="primary.main">
          {student && student.firstName} {student && student.lastName}
        </Typography>
        <Typography variant="body1" sx={{ color: "primary.main" }}>
          <strong>Email:</strong> {student && student.email}
        </Typography>
        <Typography variant="body1" sx={{ color: "primary.main" }}>
          <strong>Event Date:</strong>{" "}
          {student && new Date(student.eventDate).toDateString()}
        </Typography>
      </Paper>

      <ScheduledEmailsManager student={student} triggerRefresh={refresh} />
      <FollowupsManager student={student} />
    </Box>
  );
};

export default StudentPage;
