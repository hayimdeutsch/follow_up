import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import StudentPage from "./components/StudentPage";
import LoginPage from "./components/LoginPage";
import PageNotFound from "./components/PageNotFound";
import Questionnaire from "./components/Questionnaire";
import StudentQuestionnaire from "./components/StudentQuestionnaire";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/students/:studentId" Component={StudentPage} />
        <Route
          path="/students/:studentId/questionnaire"
          Component={Questionnaire}
        />
        <Route path="/login" Component={LoginPage} />
        <Route path="/questionnaire/:token" Component={StudentQuestionnaire} />
        <Route path="*" Component={PageNotFound} />
      </Routes>
    </Router>
  );
};

export default App;
