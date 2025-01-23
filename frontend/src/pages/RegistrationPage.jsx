// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import config from "../config/config";

// const RegistrationPage = () => {
//   const navigate = useNavigate();
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${config.backendUrl}/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ firstName, lastName, email, phone }),
//       });
//       if (response.ok) {
//         navigate("/login");
//       } else {
//         const result = await response.json();
//         setError(result.message || "Registration failed");
//       }
//     } catch (error) {
//       setError("An error occurred during registration");
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       {error && <div className="error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>First Name:</label>
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Last Name:</label>
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Phone:</label>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//       <button onClick={(e) => navigate("/login")}>Login</button>
//     </div>
//   );
// };

// export default RegistrationPage;

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useSubmit from "../hooks/useSubmit";
import { validateGmail } from "../services/validators";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();
  const { loading, error, data, submit } = useSubmit("/register");

  const onSubmit = async (data) => {
    try {
      console.log(data);
      validateGmail(data.email);
      await submit(data);
      if (error) {
        setError("form", {
          type: "manual",
          message: error,
        });
      }
    } catch (error) {
      setError("form", {
        type: "manual",
        message: error.message || "An error occurred during registration",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: "First Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ""}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{ required: "Last Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ""}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ required: "Phone is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ""}
              />
            )}
          />
          {errors.form && (
            <Typography color="error" variant="body2">
              {errors.form.message}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegistrationPage;
