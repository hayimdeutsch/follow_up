import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import StudentInfoTable from "../components/StudentInfoTable";
import ScheduledEmailsManager from "../components/ScheduledEmailsManager";
import FollowupsTable from "../components/FollowupsTable";
import useProtectedFetch from "../hooks/useProtectedFetch";

const StudentPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { studentId } = useParams();
  const {
    data: student,
    loading,
    error,
  } = useProtectedFetch(`/students/${studentId}`, refreshTrigger);

  const refresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Box>
      <Typography color="secondary" variant="h3" gutterBottom>
        Student Info
      </Typography>
      <StudentInfoTable loading={loading} student={student} error={error} />
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
        mt={4}
      >
        <Box flex={1}>
          <ScheduledEmailsManager
            loading={loading}
            student={student}
            triggerRefresh={refresh}
          />
        </Box>
        <Box flex={1}>
          <FollowupsTable
            loading={loading}
            student={student}
            triggerRefresh={refresh}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StudentPage;
