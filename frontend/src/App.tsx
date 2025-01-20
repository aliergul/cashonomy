import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import "./i18n/config";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WelcomePage />} />

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
