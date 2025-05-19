// src/pages/admin/ListBerita.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { Link, useNavigate } from "react-router-dom";

const ListBerita = () => {
  const [beritaList, setBeritaList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchKategori();
    fetchBerita();
  }, [selectedKategori]);

  const fetchBerita = async () => {
    let query = supabase
      .from("Berita")
      .select("*")
      .order("created_at", { ascending: false });

    if (selectedKategori) {
      query = query.eq("kategori", selectedKategori);
    }

    const { data, error } = await query;

    if (error) console.error(error);
    else setBeritaList(data);
  };

  const fetchKategori = async () => {
    const { data, error } = await supabase
      .from("Berita")
      .select("kategori")
      .not("kategori", "is", null);

    if (!error) {
      const uniqueKategori = [...new Set(data.map((item) => item.kategori))];
      setKategoriList(uniqueKategori);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus berita ini?"
    );
    if (!confirmed) return;

    const { error } = await supabase.from("Berita").delete().eq("id", id);

    if (error) alert("Gagal menghapus berita");
    else setBeritaList((prev) => prev.filter((berita) => berita.id !== id));
  };

  return (
    <div className="container mx-auto py-16 px-4 md:px-20">
      <h1 className="text-3xl font-bold text-center text-teal-500 mb-8">
        Daftar Berita
      </h1>

      {/* Filter Kategori */}
      <div className="mb-8">
        <label className="block text-lg font-semibold mb-2">
          Filter Kategori
        </label>
        <select
          value={selectedKategori}
          onChange={(e) => setSelectedKategori(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        >
          <option value="">Semua Kategori</option>
          {kategoriList.map((kategori, index) => (
            <option key={index} value={kategori}>
              {kategori}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-teal-500 text-white">
            <th className="py-3 px-4">Judul</th>
            <th className="py-3 px-4">Kategori</th>
            <th className="py-3 px-4">Tanggal</th>
            <th className="py-3 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {beritaList.map((berita) => (
            <tr key={berita.id} className="text-center border-b">
              <td className="py-3 px-4">{berita.judul}</td>
              <td className="py-3 px-4">{berita.kategori}</td>
              <td className="py-3 px-4">
                {new Date(berita.tanggal).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 flex justify-center gap-4">
                <button
                  onClick={() => navigate(`/admin/berita/edit/${berita.id}`)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(berita.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBerita;
