import React from "react";

const PPDBHeader = () => {
  return (
    <header className="bg-gradient-to-r from-green-50 to-green-100 text-gray-600 py-16 flex flex-col items-center justify-center pt-28 px-10">
      <img src="/images/ppdb.png" alt="Logo PPDB" className="w-64 mb-4" />
      <h1 className="text-4xl font-bold text-center text-green-800">
        Penerimaan Peserta Didik Baru (PPDB)
      </h1>
      <p className="text-lg text-center mt-2 max-w-2xl">
        Selamat datang di halaman informasi PPDB TK - SD Al Irsyad. Bergabunglah
        bersama kami untuk pendidikan berkualitas.
      </p>
    </header>
  );
};

export default PPDBHeader;
