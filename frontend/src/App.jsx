import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import FollowUpPage from "./pages/FollowUpPage";
import StudentFollowUpPage from "./pages/StudentFollowUpPage";
import TeacherFollowUpView from "./pages/TeacherFollowUpView";
import RegistrationPage from "./pages/RegistrationPage";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students/:studentId" element={<StudentPage />} />
          <Route
            path="/students/:studentId/followup"
            element={<FollowUpPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          <Route path="/followup/:token" element={<StudentFollowUpPage />} />
          <Route
            path="/teacher/followup/:token"
            element={<StudentFollowUpPage />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
