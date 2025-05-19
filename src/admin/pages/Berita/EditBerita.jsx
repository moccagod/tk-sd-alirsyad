import React, { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { useNavigate, useParams } from "react-router-dom";

const EditBerita = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    judul: "",
    tanggal: "",
    deskripsi: "",
    link: "",
    kategori: "",
  });
  const [kategoriList, setKategoriList] = useState([]);
  const [customKategori, setCustomKategori] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBerita = async () => {
      const { data, error } = await supabase
        .from("Berita")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setFormData(data);
    };

    const fetchKategori = async () => {
      const { data, error } = await supabase
        .from("Berita")
        .select("kategori", { count: "exact" });

      if (error) console.error(error);
      else {
        // Ambil kategori unik
        const uniqueKategori = [...new Set(data.map((item) => item.kategori))];
        setKategoriList(uniqueKategori);
      }
    };

    fetchBerita();
    fetchKategori();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKategoriChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      kategori: e.target.value,
    }));
    setCustomKategori("");
  };

  const handleCustomKategoriChange = (e) => {
    setCustomKategori(e.target.value);
    setFormData((prev) => ({
      ...prev,
      kategori: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("Berita")
      .update(formData)
      .eq("id", id);

    if (error) alert("Gagal memperbarui berita");
    else navigate("/admin/berita/list");
  };

  return (
    <div className="container mx-auto py-16 px-4 md:px-20">
      <h1 className="text-3xl font-bold text-center text-teal-500 mb-8">
        Edit Berita
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="judul"
          value={formData.judul}
          onChange={handleChange}
          placeholder="Judul Berita"
          required
          className="w-full p-3 border rounded-md"
        />
        <input
          type="date"
          name="tanggal"
          value={formData.tanggal}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />
        <textarea
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
          placeholder="Deskripsi Singkat"
          rows="4"
          required
          className="w-full p-3 border rounded-md"
        />
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Link Foto Berita (URL)"
          required
          className="w-full p-3 border rounded-md"
        />

        <label className="block font-semibold">Kategori Berita</label>
        <select
          name="kategori"
          value={formData.kategori}
          onChange={handleKategoriChange}
          className="w-full p-3 border rounded-md mb-2"
        >
          <option value="" disabled>
            -- Pilih kategori --
          </option>
          {kategoriList.map((kategori) => (
            <option key={kategori} value={kategori}>
              {kategori}
            </option>
          ))}
          <option value="__custom">Tambah kategori baru...</option>
        </select>
        {formData.kategori === "__custom" && (
          <input
            type="text"
            value={customKategori}
            onChange={handleCustomKategoriChange}
            placeholder="Tulis kategori baru"
            className="w-full p-3 border rounded-md"
          />
        )}

        <button
          type="submit"
          className="bg-teal-500 text-white px-6 py-3 rounded-md font-semibold"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditBerita;
