// src/admin/components/AdminLayout.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import ContactButton from "../components/ContactButton";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
      <ContactButton />
    </div>
  );
};

export default AdminLayout;
