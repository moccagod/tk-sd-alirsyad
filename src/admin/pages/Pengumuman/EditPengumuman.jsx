import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PengumumanForm from "../../components/Pengumuman/PengumumanForm";
import { supabase } from "../../../utils/supabase";

const EditPengumuman = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pengumuman, setPengumuman] = useState(null);

  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const { data, error } = await supabase
          .from("Pengumuman")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        setPengumuman(data);
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Gagal mengambil data pengumuman.");
      }
    };
    fetchPengumuman();
  }, [id]);

  const handleEditPengumuman = async (updatedData) => {
    try {
      const { error } = await supabase
        .from("Pengumuman")
        .update(updatedData)
        .eq("id", id);
      if (error) throw error;
      alert("Pengumuman berhasil diperbarui!");
      navigate("/admin/pengumuman/list");
    } catch (error) {
      console.error("Update error:", error);
      alert("Gagal memperbarui pengumuman. Silakan coba lagi.");
    }
  };

  if (!pengumuman) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Pengumuman</h1>
      <PengumumanForm
        pengumuman={pengumuman}
        onSubmit={handleEditPengumuman}
        buttonText="Update Pengumuman"
      />
    </div>
  );
};

export default EditPengumuman;
