import React from "react";
import { Link, useLocation } from "react-router-dom";

const DropdownMenu = ({ links }) => {
  const location = useLocation();

  return (
    <ul className=" absolute left-0 mt-0 bg-white shadow-lg rounded-lg overflow-hidden z-10 min-w-[200px] opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto">
      {links.map(({ to, label }) => {
        const isActive = location.pathname === to;
        return (
          <li key={to}>
            <Link
              to={to}
              className={`block px-4 py-2 text-gray-700 hover:bg-green-100 hover:text-green-700 transition-all ${
                isActive ? "bg-green-100 font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DropdownMenu;
