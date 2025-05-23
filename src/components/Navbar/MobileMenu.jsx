import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const MobileMenu = ({
  open,
  dropdownOpen,
  toggleDropdown,
  closeMobileMenu,
}) => {
  const location = useLocation();

  const menuData = [
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
    <div
      className={`fixed top-16 left-0 w-full bg-white shadow-lg z-40 transition-all duration-300 ease-in-out overflow-y-auto ${
        open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <ul className="flex flex-col p-4 space-y-2">
        {menuData.map((item) => {
          if (item.links) {
            const isOpen = dropdownOpen === item.key;
            return (
              <li key={item.key} className="relative">
                <button
                  onClick={() => toggleDropdown(isOpen ? null : item.key)}
                  className="w-full flex justify-between items-center py-2 px-3 font-semibold text-gray-700 hover:bg-gray-100 rounded focus:outline-none transition-all"
                  aria-expanded={isOpen}
                >
                  {item.title}
                  <FaChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <ul className="mt-2 space-y-1 bg-gray-50 rounded-lg shadow-md overflow-hidden">
                    {item.links.map(({ to, label }) => (
                      <li key={to}>
                        <Link
                          to={to}
                          onClick={closeMobileMenu}
                          className="block py-2 px-4 rounded hover:bg-gray-200 transition-all"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }

          return (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={closeMobileMenu}
                className="block py-2 px-3 font-semibold text-gray-700 rounded hover:bg-gray-100 transition-all"
              >
                {item.label}
              </Link>
            </li>
          );
        })}

        {/* PPDB Button */}
        <li>
          <Link
            to="/ppdb"
            onClick={closeMobileMenu}
            className="block bg-green-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-all text-center mt-4"
          >
            PPDB
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
