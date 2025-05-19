// src/components/Pengumuman/PengumumanCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const PengumumanCard = ({ pengumuman }) => {
  return (
    <Link
      to={`/pengumuman/${pengumuman.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
    >
      {/* Gambar Pengumuman */}
      {pengumuman.gambar && (
        <img
          src={pengumuman.gambar}
          alt={pengumuman.judul}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold text-green-800 mb-2">
          {pengumuman.judul}
        </h2>
        <p className="text-sm text-gray-500 mb-2">
          {new Date(pengumuman.tanggal).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-4">
          {pengumuman.isi.length > 100
            ? pengumuman.isi.substring(0, 100) + "..."
            : pengumuman.isi}
        </p>
        <span className="text-green-700 font-semibold hover:underline">
          Baca Selengkapnya
        </span>
      </div>
    </Link>
  );
};

export default PengumumanCard;
