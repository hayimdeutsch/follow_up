import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentPage from "./pages/StudentPage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import FollowUpPage from "./pages/FollowUpPage";
import StudentFollowUpPage from "./pages/StudentFollowUpPage";
import TeacherFollowUpView from "./pages/TeacherFollowUpView";
import RegistrationPage from "./pages/RegistrationPage";
import { AuthProvider } from "./config/AuthContext";
import CustomThemeProvider from "./config/CustomThemeProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomThemeProvider>
        <Router>
          <AuthProvider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Header />
              <Box
                component="main"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  flexGrow: 1,
                  padding: "15px 5%",
                  width: "100%",
                  overflowY: "auto",
                }}
              >
                <Routes>
                  <Route path="/" element={<TeacherDashboard />} />
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/student" element={<StudentPage />} />
                  <Route
                    path="/student/followups/create"
                    element={<FollowUpPage mode={"create"} />}
                  />
                  <Route
                    path="/student/followups/:id"
                    element={<FollowUpPage mode={"edit"} />}
                  />
                  <Route
                    path="/student/followups/:id/view"
                    element={<FollowUpPage mode={"view"} />}
                  />
                  <Route
                    path="/followups/:token"
                    element={<FollowUpPage mode={"student"} />}
                  />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </AuthProvider>
        </Router>
      </CustomThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
