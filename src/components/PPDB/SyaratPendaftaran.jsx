import React from "react";
import { motion } from "framer-motion";

const SyaratPendaftaran = () => {
  const requirements = [
    "Fotokopi Akta Kelahiran",
    "Fotokopi Kartu Keluarga",
    "Pas Foto Berwarna 3x4 (3 Lembar)",
    "Fotokopi Ijazah TK (untuk pendaftaran SD)",
    "Surat Keterangan Sehat dari Dokter",
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
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-extrabold text-center text-green-800 mb-12">
          Syarat Pendaftaran
        </h2>
        <motion.ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {requirements.map((item, index) => (
            <motion.li
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center border border-green-300 hover:shadow-2xl transition-shadow cursor-default select-none"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 25px rgba(34,197,94,0.4)",
              }}
            >
              <p className="text-lg font-semibold text-green-900">{item}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default SyaratPendaftaran;
