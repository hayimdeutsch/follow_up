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
import "./App.css";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomThemeProvider>
        <Router>
          <AuthProvider>
            <Header />
            <Box className="main-content" component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<TeacherDashboard />} />
                <Route path="/students/:studentId" element={<StudentPage />} />
                <Route
                  path="/students/:studentId/followup"
                  element={<FollowUpPage />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />

                <Route
                  path="/followup/:token"
                  element={<StudentFollowUpPage />}
                />
                <Route
                  path="/teacher/followup/:id"
                  element={<TeacherFollowUpView />}
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Box>
            <Footer />
          </AuthProvider>
        </Router>
      </CustomThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
