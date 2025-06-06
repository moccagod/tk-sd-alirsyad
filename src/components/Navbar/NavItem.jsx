import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ to, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className={`font-medium hover:text-green-600 ${
          isActive ? "text-green-600 font-semibold" : ""
        }`}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
