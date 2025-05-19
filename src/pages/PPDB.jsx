import React from "react";
import Navbar from "../components/Navbar/Navbar";
import PPDBHeader from "../components/PPDB/PPDBHeader";
import Keunggulan from "../components/PPDB/Keunggulan";
import AlurPendaftaran from "../components/PPDB/AlurPendaftaran";
import SyaratPendaftaran from "../components/PPDB/SyaratPendaftaran";
import JadwalPendaftaran from "../components/PPDB/JadwalPendaftaran";
import FAQ from "../components/PPDB/FAQ";
import PPDBStatus from "../components/PPDB/PPDBStatus";
import Footer from "../components/Footer";
import ContactButton from "../components/PPDB/ContactButton";

const PPDB = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <PPDBHeader />
      <Keunggulan />
      <AlurPendaftaran />
      <SyaratPendaftaran />
      <JadwalPendaftaran />
      <FAQ />
      <PPDBStatus />
      <ContactButton />
      <Footer />
    </div>
  );
};

export default PPDB;
