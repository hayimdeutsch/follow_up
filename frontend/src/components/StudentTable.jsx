import React, { useState } from "react";
import useProtectedApi from "../hooks/useProtectedApi";
import useProtectedFetch from "../hooks/useProtectedFetch";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import AddStudentModal from "./AddStudentForm";

const StudentTable = () => {
  const [trigger, setTrigger] = useState(0);
  const {
    data: students,
    error,
    loading,
  } = useProtectedFetch("/students", trigger);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { executeRequest } = useProtectedApi();

  const refresh = () => {
    setTrigger((prev) => prev + 1);
  };
  const handleClickOpen = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await executeRequest(`/students/${selectedStudent._id}`, "DELETE");
      refresh();
      handleClose();
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 3 }}>
        Error loading students.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: 550,
        mx: "auto",
        mt: 4,
        p: 2,
        boxShadow: 3,
        color: "white",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-evenly", mb: 2 }}>
        <Typography variant="h3" component="h2">
          My Students
        </Typography>
      </Box>
      <TableContainer sx={{ maxHeight: 500, overflow: "auto" }}>
        <Table>
          <TableBody>
            {students &&
              students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>
                    <Typography variant="body1">
                      {student.firstName} {student.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/student?id=${student._id}`}
                      variant="contained"
                      size="small"
                      sx={{
                        mr: 1,
                        bgcolor: "transparent",
                        color: "primary.main",
                        boxShadow: 0,
                        "&:hover": {
                          textShadow: "0 0 3px #8b2233",
                          bgcolor: "transparent",
                          color: "primary.main",
                          boxShadow: 0,
                        },
                      }}
                    >
                      View
                    </Button>{" "}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleClickOpen(student)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete {selectedStudent?.firstName}{" "}
              {selectedStudent?.lastName}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <AddStudentModal triggerRefresh={refresh} />
      </Box>
    </Box>
  );
};

export default StudentTable;
