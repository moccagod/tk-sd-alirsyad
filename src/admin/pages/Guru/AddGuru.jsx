import React, { useState } from "react";
import { supabase } from "../../../utils/supabase";
import { useNavigate } from "react-router-dom";

const AddGuru = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    umur: "",
    domisili: "",
    jabatan: "",
    jenjang: "", // TK atau SD
    whatsapp: "",
    instagram: "",
    foto_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("GuruTendik").insert([formData]);
    if (error) {
      alert("Gagal menambahkan data");
      console.error(error);
    } else {
      alert("Data berhasil ditambahkan!");
      navigate("/admin/guru/list");
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Tambah Guru / Tendik
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            type="number"
            name="umur"
            placeholder="Umur"
            value={formData.umur}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            type="text"
            name="domisili"
            placeholder="Domisili"
            value={formData.domisili}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            type="text"
            name="jabatan"
            placeholder="Jabatan (contoh: Kepala Sekolah)"
            value={formData.jabatan}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
          <select
            name="jenjang"
            value={formData.jenjang}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          >
            <option value="">-- Pilih Jenjang --</option>
            <option value="TK">TK</option>
            <option value="SD">SD</option>
          </select>
          <input
            type="text"
            name="whatsapp"
            placeholder="Link WhatsApp"
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="text"
            name="instagram"
            placeholder="Link Instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="text"
            name="foto_url"
            placeholder="Link Foto"
            value={formData.foto_url}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGuru;
