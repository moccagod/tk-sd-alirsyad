// src/pages/admin/ListPengumuman.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../utils/supabase";

const ListPengumuman = () => {
  const [pengumumanList, setPengumumanList] = useState([]);

  useEffect(() => {
    const fetchPengumuman = async () => {
      const { data, error } = await supabase
        .from("Pengumuman")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setPengumumanList(data);
    };

    fetchPengumuman();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pengumuman ini?")) return;

    try {
      const { error } = await supabase.from("Pengumuman").delete().eq("id", id);

      if (error) throw error;

      setPengumumanList((prev) => prev.filter((item) => item.id !== id));
      alert("Pengumuman berhasil dihapus!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Gagal menghapus pengumuman. Silakan coba lagi.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Daftar Pengumuman</h1>
      <ul>
        {pengumumanList.map((item) => (
          <li
            key={item.id}
            className="mb-4 bg-white p-4 rounded shadow-md flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{item.judul}</h2>
              <p className="text-sm text-gray-500">
                {new Date(item.tanggal).toLocaleDateString()}
              </p>
            </div>
            <div>
              <Link
                to={`/admin/pengumuman/edit/${item.id}`}
                className="text-blue-600 hover:underline mr-4"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPengumuman;
