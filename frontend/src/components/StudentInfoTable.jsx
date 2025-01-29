import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

const StudentInfoTable = ({ loading, student, error }) => {
  return (
    <>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error.message}</Typography>}
      {student && (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>{student.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell>{student.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{student.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Wedding Date</TableCell>
                <TableCell>
                  {new Date(student.eventDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default StudentInfoTable;
