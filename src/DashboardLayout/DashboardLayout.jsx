import React, { useContext } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

import AdminAside from "../Components/Aside/AdminAside";


const DashboardLayout = () => {
  const {  loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">

    
    <AdminAside></AdminAside>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 bg-[#F5FFFD]">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
