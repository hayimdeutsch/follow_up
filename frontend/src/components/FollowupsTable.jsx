// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
//   Button,
//   Typography,
//   Box,
//   TableHead,
// } from "@mui/material";
// import { Link } from "react-router-dom";

// const FollowupsTable = ({ loading, student, triggerRefresh }) => {
//   const [followups, setFollowups] = useState(
//     (student && student.followUps) || []
//   );
//   const [studentId, setStudentId] = useState("");

//   useEffect(() => {
//     if (!loading && student) {
//       setFollowups(student.followUps);
//       setStudentId(student._id);
//     }
//   }, [loading, student, triggerRefresh]);

//   return (
//     <Box>
//       <Typography variant="h6">Followups</Typography>
//       {!followups || followups.length === 0 ? (
//         <Typography>No followups exist.</Typography>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Questionnaire</TableCell>
//                 <TableCell>Meeting</TableCell>
//                 <TableCell>Submitted</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {followups.map((followup) => (
//                 <TableRow key={followup._id}>
//                   <TableCell>{followup.title}</TableCell>
//                   <TableCell>
//                     {followup.submitted ? "" : "Sent"}
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       component={Link}
//                       to={`/followups/${followup._id}?student=${studentId}`}
//                     >
//                       View
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//       <Button
//         variant="contained"
//         color="primary"
//         component={Link}
//         to={`/students/${studentId}/followup`}
//         sx={{ mt: 2 }}
//       >
//         Create New Followup
//       </Button>
//     </Box>
//   );
// };

// export default FollowupsTable;

import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";

const FollowupsTable = ({ loading, student, triggerRefresh }) => {
  const [followupsData, setFollowupsData] = useState([]);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    if (!loading && student) {
      setFollowupsData(student.followUps);
      setStudentId(student._id);
    }
  }, [loading, student, triggerRefresh]);

  return (
    <Box sx={{ minHeight: 200, maxHeight: 500, overflow: "auto" }}>
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography>Loading...</Typography>
        </Box>
      ) : !followupsData || followupsData.length === 0 ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography>No followups exist.</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Questionnaire</TableCell>
                <TableCell>Meeting</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {followupsData.map((followup) => (
                <TableRow key={followup._id}>
                  <TableCell>{followup.title}</TableCell>
                  <TableCell>
                    {followup.questionnaire ? (
                      <CheckIcon color="success" />
                    ) : (
                      <CloseIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell>
                    {followup.meeting ? (
                      <CheckIcon color="success" />
                    ) : (
                      <CloseIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell>
                    {followup.submitted ? (
                      <CheckIcon color="success" />
                    ) : (
                      <CloseIcon color="error" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/followups/${followup._id}?student=${studentId}`}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/students/${studentId}/followup`}
        sx={{ mt: 2 }}
      >
        Create New Followup
      </Button>
    </Box>
  );
};

export default FollowupsTable;
