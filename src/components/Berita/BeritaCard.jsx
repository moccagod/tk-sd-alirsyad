import React from "react";

const BeritaCard = ({ berita }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Foto Berita */}
      {berita.foto && (
        <img
          src={berita.foto}
          alt={berita.judul}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{berita.judul}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {new Date(berita.tanggal).toLocaleDateString()}
        </p>
        <p className="text-gray-700">{berita.deskripsi}</p>
      </div>
    </div>
  );
};

export default BeritaCard;
