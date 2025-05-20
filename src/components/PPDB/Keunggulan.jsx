import React from "react";
import { motion } from "framer-motion";
import {
  FaMosque,
  FaChalkboardTeacher,
  FaSchool,
  FaBrain,
  FaPuzzlePiece,
  FaTrophy,
} from "react-icons/fa";

const Keunggulan = () => {
  const keunggulanList = [
    {
      title: "Lingkungan Islami",
      icon: <FaMosque className="text-5xl text-green-600 mb-4" />,
    },
    {
      title: "Guru Profesional",
      icon: <FaChalkboardTeacher className="text-5xl text-green-600 mb-4" />,
    },
    {
      title: "Fasilitas Lengkap",
      icon: <FaSchool className="text-5xl text-green-600 mb-4" />,
    },
    {
      title: "Pembelajaran Holistik",
      icon: <FaBrain className="text-5xl text-green-600 mb-4" />,
    },
    {
      title: "Ekstrakurikuler Beragam",
      icon: <FaPuzzlePiece className="text-5xl text-green-600 mb-4" />,
    },
    {
      title: "Prestasi Akademis dan Non-Akademis",
      icon: <FaTrophy className="text-5xl text-green-600 mb-4" />,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl font-extrabold text-center text-green-800 mb-16 tracking-wide">
          Keunggulan Sekolah
        </h2>

        <motion.ul
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {keunggulanList.map(({ title, icon }, index) => (
            <motion.li
              key={index}
              className="flex flex-col items-center bg-white shadow-md rounded-xl p-8 border border-gray-200 text-center 
                         transition-transform hover:shadow-lg hover:scale-105 transform duration-300"
              variants={itemVariants}
            >
              {icon}
              <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                {title}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Keunggulan;
