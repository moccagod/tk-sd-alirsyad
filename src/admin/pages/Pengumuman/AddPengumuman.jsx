import React from "react";
import { useNavigate } from "react-router-dom";
import PengumumanForm from "../../components/Pengumuman/PengumumanForm";
import { supabase } from "../../../utils/supabase";

const AddPengumuman = () => {
  const navigate = useNavigate();

  const handleAddPengumuman = async (data) => {
    try {
      const { error } = await supabase.from("Pengumuman").insert(data);
      if (error) throw error;
      alert("Pengumuman berhasil ditambahkan!");
      navigate("/admin/pengumuman/list");
    } catch (error) {
      console.error("Insert error:", error);
      alert("Gagal menambahkan pengumuman. Silakan coba lagi.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Tambah Pengumuman</h1>
      <PengumumanForm
        onSubmit={handleAddPengumuman}
        buttonText="Tambah Pengumuman"
      />
    </div>
  );
};

export default AddPengumuman;
