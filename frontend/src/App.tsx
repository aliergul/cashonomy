import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import "./i18n/config";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import PublicRoute from "./routes/PublicRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App: React.FC = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider theme={theme}>
        <div className="min-h-screen bg-light-gradient dark:bg-dark-gradient">
          <Router
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <WelcomePage />
                  </PublicRoute>
                }
              />

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
        </div>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
