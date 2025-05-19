// src/pages/admin/ManageComments.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";

const ManageComments = () => {
  const [comments, setComments] = useState([]);
  const [pengumumanList, setPengumumanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPengumuman, setSelectedPengumuman] = useState("");
  const [selectedComments, setSelectedComments] = useState(new Set());

  // Ambil list pengumuman untuk filter
  useEffect(() => {
    const fetchPengumuman = async () => {
      const { data, error } = await supabase
        .from("Pengumuman")
        .select("id, judul")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setPengumumanList(data);
    };

    fetchPengumuman();
  }, []);

  // Ambil komentar sesuai filter
  useEffect(() => {
    setLoading(true);
    const fetchComments = async () => {
      let query = supabase
        .from("Pengumuman_Comments")
        .select("*")
        .order("created_at", { ascending: false });

      if (selectedPengumuman) {
        query = query.eq("pengumuman_id", selectedPengumuman);
      }

      const { data, error } = await query;

      if (error) console.error(error);
      else setComments(data);

      setLoading(false);
      setSelectedComments(new Set()); // reset selection saat filter berubah
    };

    fetchComments();
  }, [selectedPengumuman]);

  // Toggle checkbox comment selection
  const toggleSelectComment = (id) => {
    const newSelected = new Set(selectedComments);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedComments(newSelected);
  };

  // Delete selected comments
  const handleDeleteSelected = async () => {
    if (
      selectedComments.size === 0 ||
      !window.confirm(
        `Apakah Anda yakin ingin menghapus ${selectedComments.size} komentar?`
      )
    )
      return;

    try {
      const { error } = await supabase
        .from("Pengumuman_Comments")
        .delete()
        .in("id", Array.from(selectedComments));

      if (error) throw error;

      alert("Komentar berhasil dihapus.");
      setComments(comments.filter((c) => !selectedComments.has(c.id)));
      setSelectedComments(new Set());
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus komentar. Silakan coba lagi.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Kelola Komentar</h1>

      {/* Filter dropdown */}
      <div className="mb-4">
        <label htmlFor="filterPengumuman" className="mr-2 font-semibold">
          Filter berdasarkan Pengumuman:
        </label>
        <select
          id="filterPengumuman"
          value={selectedPengumuman}
          onChange={(e) => setSelectedPengumuman(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="">-- Semua Pengumuman --</option>
          {pengumumanList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.judul}
            </option>
          ))}
        </select>
      </div>

      {/* Tombol hapus banyak */}
      <div className="mb-4">
        <button
          onClick={handleDeleteSelected}
          disabled={selectedComments.size === 0}
          className={`px-4 py-2 rounded text-white transition ${
            selectedComments.size === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Hapus Komentar Terpilih ({selectedComments.size})
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">
              <input
                type="checkbox"
                checked={
                  comments.length > 0 &&
                  selectedComments.size === comments.length
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedComments(new Set(comments.map((c) => c.id)));
                  } else {
                    setSelectedComments(new Set());
                  }
                }}
              />
            </th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Komentar</th>
            <th className="border p-2">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedComments.has(comment.id)}
                  onChange={() => toggleSelectComment(comment.id)}
                />
              </td>
              <td className="border p-2">{comment.nama}</td>
              <td className="border p-2">{comment.komentar}</td>
              <td className="border p-2">
                {new Date(comment.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageComments;
