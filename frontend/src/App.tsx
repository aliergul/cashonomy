import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./i18n/config";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import PublicRoute from "./routes/PublicRoute";
import Layout from "./components/Layout/Layout";
import Incomes from "./pages/Incomes/Incomes";
import Outcomes from "./pages/Outcomes/Outcomes";
import Tags from "./pages/Tags/Tags";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-light-gradient dark:bg-dark-gradient">
        <Header />
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
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/incomes" element={<Incomes />} />
                <Route path="/outcomes" element={<Outcomes />} />
                <Route path="/tags" element={<Tags />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
