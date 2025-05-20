import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const Sambutan = () => {
  return (
    <div>
      <Navbar />

      {/* Section Kepala Sekolah TK */}
      <section className="relative min-h-screen py-28 px-6 bg-green-50 flex items-center justify-center overflow-hidden">
        <div className="container md:max-w-5xl lg:max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 z-10">
          {/* Teks TK */}
          <motion.div
            className="flex-1 text-gray-700"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
              Sambutan Kepala Sekolah TK
            </h2>
            <p className="text-lg mb-4 leading-relaxed">
              Assalamu’alaikum warahmatullahi wabarakatuh,
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Selamat datang di TK Al Irsyad. Kami berkomitmen memberikan
              pendidikan dini yang islami, penuh kasih sayang, dan menyenangkan.
              Anak-anak adalah amanah yang berharga, dan kami berusaha
              menanamkan nilai-nilai kebaikan sejak usia dini.
            </p>
            <p className="text-lg font-semibold text-green-700">
              Wassalamu’alaikum warahmatullahi wabarakatuh.
            </p>
            <p className="mt-4 font-bold text-green-900">Kepala Sekolah TK Al-Irsyad</p>
            <p className="text-gray-800">Achmad Sunanda, S.Pd</p>
          </motion.div>

          {/* Foto TK */}
          <motion.div
            className="flex-1 flex justify-center"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src="/images/gurucwo.png"
              alt="Kepala TK"
              className="hover:shadow-2xl transition-all duration-300 hover:scale-105 w-72 h-72 md:w-80 md:h-80 object-cover rounded-full shadow-lg border-4 border-green-300"
            />
          </motion.div>
        </div>
      </section>

      {/* Section Kepala Sekolah SD */}
      <section className="relative min-h-screen py-28 px-6 bg-white flex items-center justify-center overflow-hidden">
        <div className="container md:max-w-5xl lg:max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 z-10">
          {/* Foto SD */}
          <motion.div
            className="flex-1 flex justify-center"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src="/images/gurucwe.png"
              alt="Kepala SD"
              className="hover:shadow-2xl transition-all duration-300 hover:scale-105 w-72 h-72 md:w-80 md:h-80 object-cover rounded-full shadow-lg border-4 border-green-300"
            />
          </motion.div>

          {/* Teks SD */}
          <motion.div
            className="flex-1 text-gray-700"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
              Sambutan Kepala Sekolah SD
            </h2>
            <p className="text-lg mb-4 leading-relaxed">
              Assalamu’alaikum warahmatullahi wabarakatuh,
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Kami menyambut Anda di SD Al Irsyad dengan semangat kebersamaan
              dan komitmen untuk membentuk generasi yang cerdas, berakhlak, dan
              siap menghadapi masa depan. Pendidikan kami terintegrasi antara
              ilmu dunia dan akhirat.
            </p>
            <p className="text-lg font-semibold text-green-700">
              Wassalamu’alaikum warahmatullahi wabarakatuh.
            </p>
            <p className="mt-4 font-bold text-green-900">Kepala Sekolah SD Al-Irsyad</p>
            <p className="text-gray-800">Febriyana Natasya, S.Pd</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sambutan;
