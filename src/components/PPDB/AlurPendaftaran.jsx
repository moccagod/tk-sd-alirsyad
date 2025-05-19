import React from "react";
import { motion } from "framer-motion";

const AlurPendaftaran = () => {
  const steps = [
    "Pengisian Formulir Online",
    "Verifikasi Dokumen",
    "Wawancara dan Observasi",
    "Pengumuman Hasil Seleksi",
    "Pembayaran Biaya Pendaftaran",
  ];

  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center text-green-800 mb-12">
          Alur Pendaftaran
        </h2>

        <motion.ul
          className="space-y-6"
          variants={listVariants}
          initial="hidden"
          whileInView="visible" // <-- animasi saat in view
          viewport={{ once: true, amount: 0.3 }} // hanya sekali, muncul saat 30% terlihat
        >
          {steps.map((step, index) => (
            <motion.li
              key={index}
              className="flex items-center bg-white rounded-xl shadow-lg p-5 border-l-8 border-green-500 cursor-default hover:shadow-2xl transition-shadow"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-xl mr-6 select-none">
                {index + 1}
              </div>
              <p className="text-lg font-semibold text-green-900">{step}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default AlurPendaftaran;
