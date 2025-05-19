import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="contact-info p-8 rounded-2xl bg-white text-gray-800 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-green-800">Hubungi Kami</h2>

      {/* Info Kontak */}
      <ul>
        <li className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-green-400 text-2xl mr-4" />
          <div>
            <h3 className="font-semibold text-lg">Alamat</h3>
            <p>
              Jln. KH Hasyim Ashari No.27, Kel. Petojo Utara, Kec. Gambir,
              Jakarta Pusat, 10130
            </p>
          </div>
        </li>
        <li className="flex items-center mb-4">
          <FaPhone className="text-green-400 text-2xl mr-4" />
          <div>
            <h3 className="font-semibold text-lg">Telepon</h3>
            <p>+62 812-3456-7890</p>
          </div>
        </li>
        <li className="flex items-center">
          <FaEnvelope className="text-green-400 text-2xl mr-4" />
          <div>
            <h3 className="font-semibold text-lg">Email</h3>
            <p>tk.italirsyadjakartapusat@gmail.com</p>
            <p>sdsalirsyadalislamiyah@gmail.com</p>
          </div>
        </li>
      </ul>

      {/* Peta Lokasi */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-2">Lokasi Sekolah</h3>
        <iframe
          title="Lokasi Sekolah"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d938.3644045229272!2d106.81559364547948!3d-6.165860976131685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f7c1d03a5549%3A0x2da44fab7c35af98!2sSDS%20%26%20TK.IT%20Al%20Irsyad%20Al%20Islamiyah!5e0!3m2!1sid!2sid!4v1747664299812!5m2!1sid!2sid"
          width="100%"
          height="250"
          style={{ border: 0, borderRadius: "8px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactInfo;
