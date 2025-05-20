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
    <section className="bg-gradient-to-r from-green-50 to-green-100 py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-extrabold text-center text-green-800 mb-16">
          Alur Pendaftaran
        </h2>

        <div className="relative pl-8">
          {/* Garis timeline */}
          <div className="absolute top-0 left-5 h-full w-1 bg-green-300 rounded"></div>

          <motion.ul
            className="space-y-10"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {steps.map((step, index) => (
              <motion.li
                key={index}
                className="relative flex items-start space-x-4"
                variants={itemVariants}
              >
                {/* Lingkaran nomor */}
                <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white font-bold text-lg shadow-md">
                  {index + 1}
                </div>

                {/* Isi step */}
                <div className="bg-white p-5 rounded-lg shadow-md border border-green-100 w-full">
                  <p className="text-lg font-medium text-green-900">{step}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default AlurPendaftaran;
