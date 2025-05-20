import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { supabase } from "../../utils/supabase";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const GuruTendik = () => {
  const [guruTK, setGuruTK] = useState([]);
  const [guruSD, setGuruSD] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase.from("GuruTendik").select("*");
    if (!error && data) {
      setGuruTK(data.filter((g) => g.jenjang === "TK"));
      setGuruSD(data.filter((g) => g.jenjang === "SD"));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCard = (guru, i) => (
    <motion.div
      key={i}
      className="bg-white rounded-xl shadow-md border p-6 hover:shadow-lg hover:-translate-y-2 transition duration-300"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <img
        src={guru.foto_url}
        alt={guru.nama}
        className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-green-300"
      />
      <h3 className="text-xl font-semibold text-center text-green-700">
        {guru.nama}
      </h3>
      <p className="text-sm text-center text-green-500 mb-2">{guru.jabatan}</p>
      <p className="text-sm text-center text-gray-600">{guru.umur} Tahun</p>
      <p className="text-sm text-center text-gray-600 mb-4">{guru.domisili}</p>
      <div className="flex justify-center gap-4 text-green-600 text-xl">
        <a href={guru.whatsapp} target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="hover:text-green-800 transition" />
        </a>
        <a href={guru.instagram} target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-pink-600 transition" />
        </a>
      </div>
    </motion.div>
  );

  return (
    <div>
      <Navbar />

      {/* TK */}
      <section className="py-20 px-6 pt-36 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">
            Guru & Tendik TK
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {guruTK.map(renderCard)}
          </div>
        </div>
      </section>

      <div className="w-full h-1 bg-green-100 my-12"></div>

      {/* SD */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">
            Guru & Tendik SD
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {guruSD.map(renderCard)}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GuruTendik;
