import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Keunggulan = () => {
  const keunggulanList = [
    "Lingkungan Islami",
    "Guru Profesional",
    "Fasilitas Lengkap",
    "Pembelajaran Holistik",
    "Ekstrakurikuler Beragam",
    "Prestasi Akademis dan Non-Akademis",
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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gray-100 py-20">
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
          {keunggulanList.map((item, index) => (
            <motion.li
              key={index}
              className="flex flex-col items-center bg-white shadow-lg rounded-2xl p-10 border border-green-200
                         cursor-default select-none hover:shadow-2xl hover:scale-105 transform transition-transform duration-400"
              variants={itemVariants}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 20px 30px rgba(22,163,74,0.35)",
              }}
            >
              <FaCheckCircle className="text-green-600 text-6xl mb-6" />
              <p className="text-xl font-semibold text-gray-800 text-center leading-relaxed">
                {item}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Keunggulan;
