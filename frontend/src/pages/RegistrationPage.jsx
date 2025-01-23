import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSubmit from "../hooks/useSubmit";
import * as yup from "yup";

import FormContainer from "../components/Form/FormContainer";
import TextField from "../components/Form/TextField";
import PhoneNumberField from "../components/Form/PhoneNumberField";
import SubmitButton from "../components/Form/SubmitButton";

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
  const { loading, data: respData, submit } = useSubmit("/register");
  const navigate = useNavigate();

  const handleFormSubmit = async (data, setError) => {
    try {
      const combinedPhone = `${data.phone.countryCode}${data.phone.phoneNumber}`;
      const formData = { ...data, phone: combinedPhone };
      await submit(formData);
      alert(
        "Registration successful. An email will be sent to the admin for approval."
      );
      navigate("/login");
    } catch (error) {
      setError("form", {
        type: "manual",
        message: error.message || "An error occurred during registration",
      });
    }
  };

  return (
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
      <SubmitButton label="Register" disabled={loading} />
    </FormContainer>
  );
};

export default RegistrationPage;
