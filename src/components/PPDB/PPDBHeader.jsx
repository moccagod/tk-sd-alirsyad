import React from "react";
import { motion } from "framer-motion";

const PPDBHeader = () => {
  return (
    <header className="bg-gradient-to-r from-green-50 to-green-100 py-28 px-6 pt-36 text-gray-700 flex flex-col items-center text-center">
      <motion.img
        src="/images/ppdb.png"
        alt="Logo PPDB"
        className="w-52 md:w-72 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <motion.h1
        className="text-3xl md:text-5xl font-extrabold text-green-800 mb-4 leading-tight"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        Penerimaan Peserta Didik Baru (PPDB)
      </motion.h1>

      <motion.p
        className="text-base md:text-lg max-w-2xl mt-2 text-gray-700"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Selamat datang di halaman informasi PPDB TK - SD Al Irsyad. Bergabunglah
        bersama kami untuk pendidikan yang Islami, unggul, dan berkarakter.
      </motion.p>
    </header>
  );
};

export default PPDBHeader;
