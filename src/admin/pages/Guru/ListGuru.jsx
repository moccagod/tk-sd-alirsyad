import React, { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { Link } from "react-router-dom";

const ListGuru = () => {
  const [guruList, setGuruList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGuru = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("GuruTendik")
      .select("*")
      .order("nama", { ascending: true });

    if (error) {
      console.error("Gagal mengambil data:", error.message);
    } else {
      setGuruList(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("GuruTendik").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus data");
      console.error("Error delete:", error.message);
    } else {
      setGuruList((prev) => prev.filter((g) => g.id !== id));
    }
  };

  useEffect(() => {
    fetchGuru();
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-8 shadow rounded-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Daftar Guru & Tendik
        </h2>
        {loading ? (
          <p>Memuat data...</p>
        ) : guruList.length === 0 ? (
          <p>Belum ada data guru.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-green-100 text-left">
                  <th className="border p-3">Foto</th>
                  <th className="border p-3">Nama</th>
                  <th className="border p-3">Jabatan</th>
                  <th className="border p-3">Umur</th>
                  <th className="border p-3">Domisili</th>
                  <th className="border p-3">Jenjang</th>
                  <th className="border p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {guruList.map((guru) => (
                  <tr key={guru.id} className="hover:bg-gray-50">
                    <td className="border p-3">
                      <img
                        src={guru.foto_url}
                        alt={guru.nama}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="border p-3">{guru.nama}</td>
                    <td className="border p-3">{guru.jabatan}</td>
                    <td className="border p-3">{guru.umur}</td>
                    <td className="border p-3">{guru.domisili}</td>
                    <td className="border p-3">{guru.jenjang}</td>
                    <td className="border p-3 space-x-2">
                      <Link
                        to={`/admin/guru/edit/${guru.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(guru.id)}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListGuru;
