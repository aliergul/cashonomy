import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
