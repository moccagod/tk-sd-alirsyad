import React from "react";
import ContactInfo from "../components/Kontak/ContactInfo";
import ContactForm from "../components/Kontak/ContactForm";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import "../style/contact.css";

const Kontak = () => {
  return (
    <div>
      <Navbar />
      <div className="contact-page bg-white min-h-screen flex flex-col items-center p-5 md:p-10 pt-28 md:pt-38">
        <div className="container max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Kontak;
