import React from "react";
import { useAppSelector } from "../store";
import { Navigate } from "react-router-dom";
interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

export default PublicRoute;
