import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Pakai Link dari HashRouter

const slides = [
  {
    image: "/images/hero1.jpg",
    title: "Selamat Datang di TK - SD Al Irsyad Al Islamiyyah",
    description:
      "Sekolah Dasar terbaik untuk membentuk generasi cerdas dan berakhlak mulia.",
    link: "/ppdb",
    buttonText: "Daftar Sekarang",
  },
  {
    image: "/images/hero2.jpg",
    title: "Pendidikan Berkualitas",
    description:
      "Kami menyediakan lingkungan belajar yang aman, nyaman, dan menyenangkan.",
    link: "/akademik/prestasi",
    buttonText: "Prestasi",
  },
  {
    image: "/images/hero3.jpg",
    title: "Guru Profesional",
    description:
      "Tenaga pendidik berpengalaman siap membimbing anak-anak meraih prestasi.",
    link: "/profile/guru-tendik",
    buttonText: "Kenali Guru Kami",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {/* Gambar Background */}
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          alt={`slide-${index}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-20" />

      {/* Konten Tengah */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
          {slides[current].title}
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl drop-shadow">
          {slides[current].description}
        </p>
        <Link
          to={slides[current].link}
          className="bg-teal-500 hover:bg-teal-600 transition-all px-6 py-3 rounded-full font-bold text-white shadow-lg"
        >
          {slides[current].buttonText}
        </Link>
      </div>
    </div>
  );
};

export default Hero;
