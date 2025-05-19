// src/components/Pengumuman/PengumumanForm.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase";

const PengumumanForm = ({ pengumuman, onSubmit, buttonText }) => {
  const [judul, setJudul] = useState(pengumuman?.judul || "");
  const [tanggal, setTanggal] = useState(pengumuman?.tanggal || "");
  const [kategori, setKategori] = useState(pengumuman?.kategori || "");
  const [isi, setIsi] = useState(pengumuman?.isi || "");
  const [gambar, setGambar] = useState(pengumuman?.gambar || "");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("Pengumuman")
        .select("kategori");
      if (error) console.error(error);
      else {
        const uniqueCategories = [
          ...new Set(data.map((item) => item.kategori)),
        ];
        setCategories(uniqueCategories);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
      setKategori(newCategory);
      setNewCategory("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      judul,
      tanggal,
      kategori,
      isi,
      gambar,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        placeholder="Judul Pengumuman"
        className="w-full p-3 border rounded-md"
        required
      />
      <input
        type="date"
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
        className="w-full p-3 border rounded-md"
        required
      />
      <select
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        className="w-full p-3 border rounded-md"
        required
      >
        <option value="">Pilih Kategori</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Tambahkan input untuk menambah kategori baru */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Tambah Kategori Baru"
          className="flex-1 p-3 border rounded-md"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className="bg-green-800 text-white px-4 py-3 rounded-md hover:bg-green-700 transition"
        >
          Tambah
        </button>
      </div>

      <textarea
        value={isi}
        onChange={(e) => setIsi(e.target.value)}
        placeholder="Isi Pengumuman"
        className="w-full p-3 border rounded-md"
        rows={6}
        required
      />

      <input
        type="text"
        value={gambar}
        onChange={(e) => setGambar(e.target.value)}
        placeholder="Link Gambar"
        className="w-full p-3 border rounded-md"
      />

      <button
        type="submit"
        className="w-full bg-green-800 text-white py-3 rounded-md hover:bg-green-700 transition"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default PengumumanForm;
