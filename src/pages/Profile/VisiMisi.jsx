import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import { FaCheckCircle, FaEye, FaBullseye } from "react-icons/fa";
import { motion } from "framer-motion";

const misiList = [
  "Menanamkan nilai-nilai Islam sejak dini.",
  "Mengembangkan potensi akademik dan non-akademik.",
  "Menciptakan lingkungan belajar yang menyenangkan.",
  "Menanamkan sikap mandiri dan disiplin.",
  "Menjalin kemitraan dengan orang tua dan masyarakat.",
];

const VisiMisi = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />

      <section className="pt-38 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 text-center mb-16">
            Visi & Misi Sekolah
          </h1>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Visi */}
            <motion.div
              className="bg-white shadow-md rounded-xl p-8 border-l-4 border-green-500 transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaEye className="text-green-600 text-2xl" />
                <h2 className="text-2xl font-semibold text-green-700">Visi</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Mewujudkan generasi muslim yang beriman, berakhlak mulia,
                cerdas, mandiri, serta berwawasan global dengan landasan
                nilai-nilai Islam.
              </p>
            </motion.div>

            {/* Misi */}
            <motion.div
              className="bg-white shadow-md rounded-xl p-8 border-l-4 border-green-500 transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaBullseye className="text-green-600 text-2xl" />
                <h2 className="text-2xl font-semibold text-green-700">Misi</h2>
              </div>
              <ul className="space-y-4 mt-2">
                {misiList.map((misi, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <p className="text-gray-700">{misi}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VisiMisi;
