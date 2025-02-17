import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import * as yup from "yup";
import useProtectedApi from "../hooks/useProtectedApi";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DateField from "../components/Form/DateField";
import SubmitButton from "../components/Form/SubmitButton";
import FormContainer from "../components/Form/FormContainer";

const schema = yup.object().shape({
  scheduledDate: yup
    .date()
    .required("Scheduled Date is required")
    .typeError("Scheduled Date must be a valid date")
    .min(new Date(), "Scheduled Date must be in the future"),
});

const ScheduledEmailsManager = ({
  loading,
  student,
  error,
  triggerRefresh,
}) => {
  const { executeRequest } = useProtectedApi();
  const [newEmailDate, setNewEmailDate] = useState("");
  const [scheduledEmails, setScheduledEmails] = useState([]);

  useEffect(() => {
    if (!loading && student) setScheduledEmails(student.scheduledEmails);
  }, [loading, student]);

  const onEmailsChange = async (emails) => {
    await executeRequest(`/students/${student._id}/emails`, "PUT", {
      scheduledEmails: emails,
    });
    triggerRefresh();
  };

  const handleAddEmail = async (data, setError, reset) => {
    try {
      const updatedEmails = [
        ...scheduledEmails,
        { scheduledDate: data.scheduledDate },
      ];
      onEmailsChange(updatedEmails);
      reset();
    } catch (error) {
      setError("scheduledDate", {
        type: "manual",
        message:
          error.message || "An error occurred while scheduling the email",
      });
    }
  };

  const handleDeleteEmail = async (index) => {
    const updatedEmails = scheduledEmails.filter((_, i) => i !== index);
    onEmailsChange(updatedEmails);
  };

  return (
    <Paper
      sx={{
        p: 2,
        mt: 2,
        boxShadow: 3,
        borderRadius: 1,
      }}
    >
      <Typography variant="h5" color="primary.main" gutterBottom>
        Scheduled Emails
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxHeight: { xs: "200px", md: "auto" },
            overflowY: "auto",
            p: 1,
            borderRadius: 1,
          }}
        >
          <List>
            {scheduledEmails.map((email, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteEmail(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={new Date(email.scheduledDate).toDateString()}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider
          sx={{
            display: { xs: "block", md: "none" },
            my: 1,
          }}
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", md: "block" } }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            You will receive an email on the selected date reminding you to
            arrange a follow-up with the student.
          </Typography>
          <FormContainer
            defaultValues={{ scheduledDate: "" }}
            onSubmit={handleAddEmail}
            validationSchema={schema}
          >
            <DateField name="scheduledDate" label="Select Date" />
            <SubmitButton label="Schedule" />
          </FormContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default ScheduledEmailsManager;
