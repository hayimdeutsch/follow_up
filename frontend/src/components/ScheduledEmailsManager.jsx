import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import useProtectedApi from "../hooks/useProtectedApi";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const ScheduledEmailsManager = ({ loading, student, triggerRefresh }) => {
  const { executeRequest } = useProtectedApi();
  const [newEmailDate, setNewEmailDate] = useState("");
  const [scheduledEmails, setScheduledEmails] = useState([]);

  useEffect(() => {
    if (!loading && student) setScheduledEmails(student.scheduledEmails);
  }, [loading, student, triggerRefresh]);

  const onEmailsChange = async (emails) => {
    //setScheduledEmails(emails);
    await executeRequest(`/students/${student._id}/emails`, "PUT", {
      scheduledEmails: emails,
    });
    triggerRefresh();
  };

  const handleAddEmail = async () => {
    if (newEmailDate) {
      const updatedEmails = [
        ...scheduledEmails,
        { scheduledDate: newEmailDate },
      ];
      onEmailsChange(updatedEmails);
      setNewEmailDate("");
    }
  };

  const handleDeleteEmail = async (index) => {
    const updatedEmails = scheduledEmails.filter((_, i) => i !== index);
    onEmailsChange(updatedEmails);
  };

  return (
    <Box>
      <Typography variant="h6">Scheduled Emails</Typography>
      <List>
        {student &&
          student.scheduledEmails &&
          scheduledEmails.map((email, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={new Date(email.scheduledDate).toLocaleDateString()}
                secondary={`Status: ${email.status}`}
              />
              <IconButton edge="end" onClick={() => handleDeleteEmail(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
      </List>
      <Box display="flex" alignItems="center" mt={2}>
        <input
          type="date"
          value={newEmailDate}
          onChange={(e) => setNewEmailDate(e.target.value)}
        />
        <Button startIcon={<AddIcon />} onClick={handleAddEmail}>
          Add Email
        </Button>
      </Box>
    </Box>
  );
};

export default ScheduledEmailsManager;
