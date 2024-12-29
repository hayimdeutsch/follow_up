import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import StudentPage from "./components/StudentPage";
import LoginPage from "./components/LoginPage";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={HomePage} />
        <Route path="/students/:studentId" exact Component={StudentPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="*" Component={PageNotFound} />
      </Routes>
    </Router>
  );
};

export default App;
