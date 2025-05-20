import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Sambutan Kepala Sekolah", href: "/profile/sambutan" },
    { label: "Pengumuman", href: "/pengumuman" },
    { label: "Kontak", href: "/kontak" },
    { label: "PPDB", href: "/PPDB" },
    { label: "Login Admin", href: "/admin" },
  ];

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between gap-10">
        {/* Logo & Deskripsi */}
        <div className="flex-1 max-w-sm">
          <img
            src="/images/logo-alirsyad.png"
            alt="Logo Al-Irsyad"
            className="w-20 mb-5"
          />
          <p className="text-gray-600 leading-relaxed">
            Mewujudkan generasi berakhlak, cerdas, dan kreatif dengan pendidikan
            islami berkualitas tinggi.
          </p>
        </div>

        {/* Navigasi */}
        <nav className="flex-1 max-w-xs">
          <h4 className="text-xl font-semibold mb-6 text-gray-900">Navigasi</h4>
          <ul className="space-y-4">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="relative text-gray-700 hover:text-green-600 transition-colors before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-green-600 before:transition-all hover:before:w-full"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Kontak */}
        <div className="flex-1 max-w-xs">
          <h4 className="text-xl font-semibold mb-6 text-gray-900">
            Kontak Kami
          </h4>
          <address className="not-italic text-gray-600 space-y-3">
            <p>
              Jln. KH Hasyim Ashari No.27, Kel. Petojo Utara, Kec. Gambir,
              Jakarta Pusat, 10130
            </p>
            <p>
              Email TK:{" "}
              <a
                href="mailto:tk.italirsyadjakartapusat@gmail.com"
                className="text-green-600 hover:underline"
              >
                tk.italirsyadjakartapusat@gmail.com
              </a>
            </p>
            <p>
              Email SD:{" "}
              <a
                href="mailto:sdsalirsyadalislamiyah@gmail.com"
                className="text-green-600 hover:underline"
              >
                sdsalirsyadalislamiyah@gmail.com
              </a>
            </p>
            <p>
              Telp:{" "}
              <a
                href="tel:+622112345678"
                className="text-green-600 hover:underline"
              >
                (021) 1234 5678
              </a>
            </p>
          </address>
        </div>

        {/* Sosial Media */}
        <div className="flex-1 max-w-xs">
          <h4 className="text-xl font-semibold mb-6 text-gray-900">
            Ikuti Kami
          </h4>
          <div className="flex space-x-5">
            {[
              {
                icon: <FaFacebookF />,
                link: "https://facebook.com",
                label: "Facebook",
              },
              {
                icon: <FaInstagram />,
                link: "https://instagram.com",
                label: "Instagram",
              },
              {
                icon: <FaTwitter />,
                link: "https://twitter.com",
                label: "Twitter",
              },
              {
                icon: <FaYoutube />,
                link: "https://youtube.com",
                label: "YouTube",
              },
            ].map(({ icon, link, label }) => (
              <a
                key={label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-md hover:shadow-lg transform hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm select-none">
        <p>
          &copy; {new Date().getFullYear()} Al Irsyad School. All rights
          reserved.
        </p>
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://moccagod.github.io/azminailalhadi/"
            className="hover:underline"
          >
            Azmi Nailal Hadi
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
