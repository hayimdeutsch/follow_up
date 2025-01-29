import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormContext, useFieldArray } from "react-hook-form";
import useProtectedApi from "../hooks/useProtectedApi";
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import FormContainer from "../components/Form/FormContainer";
import TextField from "../components/Form/TextField";
import DateField from "../components/Form/DateField";
import SubmitButton from "../components/Form/SubmitButton";
import ScheduledEmails from "./ScheduledEmails2";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  eventDate: yup
    .date()
    .required("Event Date is required")
    .typeError("Event Date must be a valid date"),
  scheduledEmails: yup
    .array()
    .of(
      yup.object().shape({
        scheduledDate: yup
          .date()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === "" || originalValue === undefined ? null : value
          )
          .typeError("Scheduled Date must be a valid date")
          .test(
            "is-future-date",
            "Scheduled Date must be in the future",
            (value) => {
              if (!value) return true;
              return new Date(value) > new Date();
            }
          ),
      })
    )
    .transform((value) => value.filter((email) => email.scheduledDate))
    .default([]),
});

const AddStudentModal = ({ triggerRefresh }) => {
  const [open, setOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    loading,
    error: submissionError,
    executeRequest: submit,
  } = useProtectedApi();

  const handleReset = () => {
    setFormSubmitted(false);
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);

  const handleFormSubmit = async (data, setError, reset) => {
    const filteredData = {
      ...data,
      scheduledEmails: data.scheduledEmails.filter(
        (email) =>
          email.scheduledDate && !isNaN(new Date(email.scheduledDate).getTime())
      ),
    };
    try {
      await submit("/students", "POST", filteredData);
      setFormSubmitted(true);
      triggerRefresh();
      reset();
    } catch (error) {
      setError("form", {
        type: "manual",
        message: error.message || "An error occurred during submission",
      });
    }
  };

  const handleClose = (event, reason) => {
    if (formSubmitted) {
      handleReset();
    } else if (reason === "backdropClick") return;
    handleReset();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained">
        Add Student
      </Button>
      {formSubmitted ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            <DialogContentText>Student added successfully.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={open} onClose={handleClose}>
          <FormContainer
            defaultValues={{
              firstName: "",
              lastName: "",
              email: "",
              eventDate: "",
              scheduledEmails: [],
            }}
            onSubmit={(data, methods) =>
              handleFormSubmit(data, methods.setError, methods.reset)
            }
            validationSchema={schema}
            resetOnClose={true}
          >
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent>
              <TextField name="firstName" label="First Name" />
              <TextField name="lastName" label="Last Name" />
              <TextField name="email" label="Email" />
              <DateField name="eventDate" label="Event Date" />
              <Divider sx={{ my: 2 }} />
              <ScheduledEmails />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{ width: "50%" }}
                color="secondary"
              >
                Cancel
              </Button>
              <SubmitButton
                label="Add Student"
                sx={{ width: "50%" }}
                disabled={loading}
                watchFields={["firstName", "lastName", "email", "eventDate"]}
              />
            </DialogActions>
          </FormContainer>
        </Dialog>
      )}
    </>
  );
};

export default AddStudentModal;
