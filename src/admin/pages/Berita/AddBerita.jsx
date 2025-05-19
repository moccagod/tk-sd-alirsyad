import React, { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase";
import { useNavigate } from "react-router-dom";

const AddBerita = () => {
  const [formData, setFormData] = useState({
    judul: "",
    tanggal: "",
    deskripsi: "",
    link: "",
    foto: "",
    kategori: "",
  });
  const [kategoriList, setKategoriList] = useState([]);
  const [customKategori, setCustomKategori] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchKategori();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Untuk kategori, khusus handle customKategori agar sinkron dengan formData.kategori
    if (name === "kategori") {
      if (value === "__custom") {
        // pilih opsi tambah kategori baru
        setFormData((prev) => ({
          ...prev,
          kategori: "",
        }));
        setCustomKategori("");
      } else {
        setFormData((prev) => ({
          ...prev,
          kategori: value,
        }));
        setCustomKategori("");
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCustomKategoriChange = (e) => {
    const value = e.target.value;
    setCustomKategori(value);
    setFormData((prev) => ({
      ...prev,
      kategori: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi kategori wajib diisi
    if (!formData.kategori || formData.kategori.trim() === "") {
      alert("Kategori wajib diisi");
      return;
    }

    const { error } = await supabase.from("Berita").insert([formData]);

    if (error) {
      alert("Gagal menambahkan berita");
    } else {
      navigate("/admin/berita/list");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 md:px-20">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-600 text-center mb-8">
          Tambah Berita
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Judul Berita */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Judul Berita
            </label>
            <input
              type="text"
              name="judul"
              placeholder="Judul Berita"
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Tanggal */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Tanggal
            </label>
            <input
              type="date"
              name="tanggal"
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Deskripsi Singkat */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Deskripsi Singkat
            </label>
            <textarea
              name="deskripsi"
              placeholder="Deskripsi Singkat"
              rows="4"
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Link
            </label>
            <input
              type="text"
              name="link"
              placeholder="Link"
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Foto */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Foto (Link Eksternal)
            </label>
            <input
              type="text"
              name="foto"
              placeholder="Link Foto"
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Kategori Berita
            </label>
            <select
              name="kategori"
              value={
                kategoriList.includes(formData.kategori)
                  ? formData.kategori
                  : "__custom"
              }
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 mb-2"
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              {kategoriList.map((kategori, index) => (
                <option key={index} value={kategori}>
                  {kategori}
                </option>
              ))}
              <option value="__custom">Tambah kategori baru...</option>
            </select>
            {(!kategoriList.includes(formData.kategori) ||
              formData.kategori === "") && (
              <input
                type="text"
                value={customKategori}
                onChange={handleCustomKategoriChange}
                placeholder="Tulis kategori baru"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            )}
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold text-lg transition-all hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300"
          >
            Tambah Berita
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBerita;
