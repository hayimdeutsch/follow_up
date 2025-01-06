import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import LoginPage from "./components/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import FollowUpPage from "./pages/FollowUpPage";
import StudentFollowUpPage from "./pages/StudentFollowUpPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students/:studentId" element={<StudentPage />} />
        <Route
          path="/students/:studentId/followup"
          element={<FollowUpPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/followup/:token" element={<StudentFollowUpPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
