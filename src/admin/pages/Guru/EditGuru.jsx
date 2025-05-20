import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabase";

const EditGuru = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    umur: "",
    domisili: "",
    jabatan: "",
    jenjang: "",
    whatsapp: "",
    instagram: "",
    foto_url: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchGuruById = async () => {
    const { data, error } = await supabase
      .from("GuruTendik")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Gagal memuat data:", error.message);
    } else {
      setFormData(data);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("GuruTendik")
      .update(formData)
      .eq("id", id);

    if (error) {
      alert("Gagal memperbarui data");
      console.error(error);
    } else {
      alert("Data berhasil diperbarui");
      navigate("/admin/list");
    }
  };

  useEffect(() => {
    fetchGuruById();
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white p-8 shadow rounded-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Edit Data Guru / Tendik
        </h2>

        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Nama", name: "nama" },
              { label: "Umur", name: "umur", type: "number" },
              { label: "Domisili", name: "domisili" },
              { label: "Jabatan", name: "jabatan" },
              { label: "Jenjang (TK/SD)", name: "jenjang" },
              { label: "Link WhatsApp", name: "whatsapp" },
              { label: "Link Instagram", name: "instagram" },
              { label: "Foto URL", name: "foto_url" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <label className="block font-semibold mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  required
                />
              </div>
            ))}

            <div className="text-right">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditGuru;
