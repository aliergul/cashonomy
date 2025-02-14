import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";

const PrivateRoute: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
