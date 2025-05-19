import React from "react";
import { motion } from "framer-motion";

const JadwalPendaftaran = () => {
  const schedule = [
    { tahap: "Pendaftaran Online", tanggal: "1 Mei - 30 Juni 2025" },
    { tahap: "Verifikasi Dokumen", tanggal: "1 - 5 Juli 2025" },
    { tahap: "Wawancara dan Observasi", tanggal: "10 - 15 Juli 2025" },
    { tahap: "Pengumuman", tanggal: "20 Juli 2025" },
    { tahap: "Daftar Ulang", tanggal: "21 - 31 Juli 2025" },
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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center text-green-800 mb-12">
          Jadwal Pendaftaran
        </h2>

        <motion.ul
          className="space-y-6"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {schedule.map((item, index) => (
            <motion.li
              key={index}
              className="flex items-center bg-white rounded-xl shadow-lg p-5 border-l-8 border-green-500 cursor-default hover:shadow-2xl transition-shadow"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-xl mr-6 select-none">
                {index + 1}
              </div>
              <div>
                <p className="text-lg font-semibold text-green-900">
                  {item.tahap}
                </p>
                <p className="text-green-700 mt-1">{item.tanggal}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default JadwalPendaftaran;
