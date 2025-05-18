// src/components/WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const ContactButton = () => {
  const whatsappNumber = "6285811303841"; // Ganti dengan nomor WhatsApp Anda
  const message = "Halo, saya ingin bertanya tentang admin panel Al Irsyad.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition duration-300 flex items-center gap-2 z-50"
      aria-label="Hubungi Kami di WhatsApp"
    >
      <FaWhatsapp size={28} />
      <span className="font-semibold text-lg">Butuh Bantuan?</span>
    </a>
  );
};

export default ContactButton;
