import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase"; // pastikan path supabase client benar
import { motion } from "framer-motion";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggle = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login"); // arahkan ke halaman login setelah logout
  };

  return (
    <motion.div
      className="w-64 min-h-screen bg-gray-800 text-white p-6 flex flex-col justify-between"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <Link
          to="/admin"
          className={`block px-4 py-2 mb-3 rounded hover:bg-gray-600 transition ${
            location.pathname === "/admin" ? "bg-gray-600 font-semibold" : ""
          }`}
        >
          Dashboard
        </Link>

        <SidebarItem
          title="Berita"
          links={[
            { path: "/admin/berita/add", label: "Add Berita" },
            { path: "/admin/berita/list", label: "List Berita" },
          ]}
          isOpen={openDropdown === "berita"}
          onToggle={() => handleToggle("berita")}
        />

        <SidebarItem
          title="Pengumuman"
          links={[
            { path: "/admin/pengumuman/add", label: "Add Pengumuman" },
            { path: "/admin/pengumuman/list", label: "List Pengumuman" },
            { path: "/admin/pengumuman/comments", label: "Komentar" },
          ]}
          isOpen={openDropdown === "pengumuman"}
          onToggle={() => handleToggle("pengumuman")}
        />

        <SidebarItem
          title="Guru"
          links={[
            { path: "/admin/guru/add", label: "Add Guru" },
            { path: "/admin/guru/list", label: "List Guru" },
          ]}
          isOpen={openDropdown === "guru"}
          onToggle={() => handleToggle("guru")}
        />

        <Link
          to="/admin/spmb"
          className={`block px-4 py-2 mb-3 rounded hover:bg-gray-600 transition ${
            location.pathname === "/admin/ppdb"
              ? "bg-gray-600 font-semibold"
              : ""
          }`}
        >
          SPMB
        </Link>
        <Link
          to="/admin/account"
          className={`block px-4 py-2 mb-3 rounded hover:bg-gray-600 transition ${
            location.pathname === "/admin/account"
              ? "bg-gray-600 font-semibold"
              : ""
          }`}
        >
          Account Settings
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="cursor-pointer w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition text-white font-semibold"
      >
        Logout
      </button>
    </motion.div>
  );
};

export default Sidebar;
