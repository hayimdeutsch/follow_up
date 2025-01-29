import React from "react";
import {
  useSearchParams,
  useNavigate,
  Link as RouterLink,
} from "react-router-dom";
import * as yup from "yup";
import FormContainer from "../components/Form/FormContainer";
import TextField from "../components/Form/TextField";
import CheckboxField from "../components/Form/CheckboxField";
import SubmitButton from "../components/Form/SubmitButton";
import { useAuth } from "../config/AuthContext";
import { Link, Box, Typography } from "@mui/material";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail.com$/,
      "Only Gmail accounts are allowed"
    ),
  isAdmin: yup.boolean(),
});

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const redirectURL = searchParams.get("redirectTo");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (data, setError) => {
    try {
      await login(data.email, data.isAdmin, redirectURL);
    } catch (error) {
      setError("form", {
        type: "manual",
        message: error.message || "Login failed",
      });
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        minWidth: 550,
        mx: "auto",
        mt: 15,
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        backgroundColor: "background.paper",
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" component="h1" align="center" sx={{ mb: 3 }}>
        Login
      </Typography>
      <FormContainer
        defaultValues={{ email: "", isAdmin: false }}
        onSubmit={(data, methods) => handleFormSubmit(data, methods.setError)}
        validationSchema={schema}
      >
        <TextField name="email" label="Email" />
        <CheckboxField
          name="isAdmin"
          label="Admin"
          sx={{ color: "primary.dark" }}
        />
        <SubmitButton
          label="Login"
          watchFields={["email", "isAdmin"]}
          sx={{ mt: 2 }}
        />
      </FormContainer>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Link component={RouterLink} to="/register" color="primary.light">
          Sign up now!
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;
