import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import NavItem from "./NavItem";
import DropdownMenu from "./DropdownMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Untuk mobile dropdown

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(null); // reset dropdown saat tutup mobile menu
  };

  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => (prev === key ? null : key));
  };

  const menuItems = [
    { to: "/", label: "Landing Page" },
    {
      title: "Profile",
      key: "profile",
      links: [
        { to: "/profile/sambutan", label: "Sambutan Kepala Sekolah" },
        { to: "/profile/visi-misi", label: "Visi & Misi" },
        { to: "/profile/guru-tendik", label: "Guru & Tendik" },
      ],
    },
    {
      title: "Akademik",
      key: "akademik",
      links: [
        { to: "/akademik/program-sekolah", label: "Program Sekolah" },
        { to: "/akademik/kurikulum", label: "Kurikulum" },
        { to: "/akademik/ekstrakurikuler", label: "Ekstrakurikuler" },
        { to: "/akademik/kalender", label: "Kalender" },
        { to: "/akademik/prestasi", label: "Prestasi" },
      ],
    },
    { to: "/pengumuman", label: "Pengumuman" },
    { to: "/berita", label: "Berita" },
    { to: "/kontak", label: "Kontak" },
  ];

  return (
    <nav className="bg-white shadow-md px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img src="/vite.svg" alt="Logo" className="w-10 h-10" />
            <Link to="/" className="text-2xl font-bold text-indigo-700">
              TK - SD Al Irsyad
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-6 items-center">
            {menuItems.map((item, index) => {
              if (item.links) {
                return (
                  <div key={index} className="relative group">
                    <button className="cursor-pointer flex items-center font-semibold text-gray-700 py-2 px-3 hover:text-indigo-600 focus:outline-none relative z-20">
                      {item.title} <FaChevronDown className="ml-1" />
                    </button>

                    {/* Dropdown */}
                    <DropdownMenu links={item.links} />
                  </div>
                );
              }

              return <NavItem key={index} to={item.to} label={item.label} />;
            })}
          </ul>

          {/* PPDB Button */}
          <Link
            to="/ppdb"
            className="hidden lg:flex bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all"
          >
            PPDB
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu
          dropdownOpen={dropdownOpen}
          toggleDropdown={toggleDropdown}
          closeMobileMenu={closeMobileMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;
