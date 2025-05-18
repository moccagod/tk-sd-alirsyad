// src/admin/components/SidebarItem.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ title, links, isOpen, onToggle }) => {
  const location = useLocation();

  return (
    <div className="mb-3">
      <div
        onClick={onToggle}
        className="flex justify-between items-center px-4 py-2 rounded cursor-pointer hover:bg-gray-600 transition"
      >
        <span>{title}</span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="ml-4 mt-2 flex flex-col items-start">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1 rounded hover:bg-gray-600 w-full text-left ${
                location.pathname === link.path
                  ? "bg-gray-600 font-semibold"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
