import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "Apakah ada batasan umur untuk masuk TK?",
      answer:
        "Ya, anak harus berusia minimal 4 tahun untuk TK A dan 5 tahun untuk TK B.",
    },
    {
      question: "Apakah ada biaya formulir pendaftaran?",
      answer: "Tidak, pengisian formulir pendaftaran online gratis.",
    },
    {
      question: "Apakah bisa mendaftar secara offline?",
      answer:
        "Saat ini pendaftaran dilakukan secara online untuk memudahkan proses.",
    },
    {
      question: "Apakah ada program beasiswa?",
      answer: "Ya, tersedia program beasiswa untuk siswa berprestasi.",
    },
    {
      question: "Apakah ada fasilitas antar jemput?",
      answer: "Ya, kami menyediakan layanan antar jemput untuk siswa.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Variants animasi scroll muncul section
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Variants untuk jawaban dropdown
  const answerVariants = {
    hidden: { opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      paddingTop: 16,
      paddingBottom: 16,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="bg-gray-100 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-10">
          Pertanyaan dan Jawaban (FAQ)
        </h2>
        <ul className="space-y-4">
          {faqs.map((faq, index) => (
            <li
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-green-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-5 text-left font-semibold text-lg hover:bg-green-50 transition-colors"
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-green-600 transform transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="content"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={answerVariants}
                    className="px-5 text-green-800"
                    style={{ overflow: "hidden" }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default FAQ;
