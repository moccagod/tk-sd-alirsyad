import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import { motion } from "framer-motion";

const CommentForm = ({ pengumumanId, parentId, onCommentAdded, onCancel }) => {
  const [nama, setNama] = useState("");
  const [komentar, setKomentar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("Pengumuman_Comments").insert({
        pengumuman_id: pengumumanId,
        parent_id: parentId || null,
        nama,
        komentar,
      });

      if (error) throw error;

      setNama("");
      setKomentar("");
      onCommentAdded();
      if (onCancel) onCancel(); // Tutup form reply setelah komentar
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Gagal mengirim komentar. Silakan coba lagi.");
    }

    setIsLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 mb-4"
    >
      <input
        type="text"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Nama Anda"
        className="w-full p-3 border rounded-md bg-gray-50"
        required
      />
      <textarea
        value={komentar}
        onChange={(e) => setKomentar(e.target.value)}
        placeholder="Komentar Anda"
        className="w-full p-3 border rounded-md bg-gray-50"
        rows={3}
        required
      />
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-800 text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Mengirim..." : "Kirim"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-red-600 py-2 px-6 rounded-md hover:underline"
          >
            Batal
          </button>
        )}
      </div>
    </motion.form>
  );
};

export default CommentForm;
