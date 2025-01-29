import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import useSubmit from "../hooks/useSubmit";
import * as yup from "yup";

import FormContainer from "../components/Form/FormContainer";
import TextField from "../components/Form/TextField";
import PhoneNumberField from "../components/Form/PhoneNumberField";
import SubmitButton from "../components/Form/SubmitButton";
import { Box, Typography, Button, Link, Modal } from "@mui/material";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup.object().shape({
    countryCode: yup.string().required("Country code is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(8, "Phone number must be at least 8 digits")
      .max(13, "Phone number must be at most 13 digits"),
  }),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail.com$/,
      "Only Gmail accounts are allowed"
    ),
});

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { loading, data: respData, submit } = useSubmit("/register");

  const handleFormSubmit = async (data, setError) => {
    try {
      const combinedPhone = `${data.phone.countryCode}${data.phone.phoneNumber}`;
      const formData = { ...data, phone: combinedPhone };
      await submit(formData);
      setOpen(true);
    } catch (error) {
      setError("form", {
        type: "manual",
        message: error.message || "An error occurred during registration",
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      <Box
        sx={{
          mx: "auto",
          mt: 5,
          p: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          backgroundColor: "background.paper",
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" align="center" sx={{ mb: 3 }}>
          Create an Account
        </Typography>
        <FormContainer
          defaultValues={{
            firstName: "",
            lastName: "",
            phone: { countryCode: "+1", phoneNumber: "" },
            email: "",
          }}
          onSubmit={(data, methods) => handleFormSubmit(data, methods.setError)}
          validationSchema={schema}
        >
          <TextField name="firstName" label="First Name" />
          <TextField name="lastName" label="Last Name" />
          <PhoneNumberField name="phone" label="Phone" />
          <TextField name="email" label="Email" />
          <SubmitButton
            label="Register"
            disabled={loading}
            watchFields={["firstName", "lastName", "phone", "email"]}
          />
        </FormContainer>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link component={RouterLink} to="/login" color="tertiary">
            Login here!
          </Link>
        </Typography>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            You have successfully registered! An email will be sent to the admin
            for approval.
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default RegistrationPage;
