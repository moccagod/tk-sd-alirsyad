import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

const PPDBStatus = () => {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("PPDB")
        .select("id, status")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      if (data) {
        setStatus(data.status);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const updateStatus = async () => {
    setSaving(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("PPDB")
        .select("id")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      if (data) {
        const { error: updateError } = await supabase
          .from("PPDB")
          .update({ status })
          .eq("id", data.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("PPDB")
          .insert([{ status }]);
        if (insertError) throw insertError;
      }

      alert("Status PPDB berhasil diperbarui");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        Loading status PPDB...
      </div>
    );

  return (
    <div
      className={`px-8 flex items-center justify-center min-h-screen ${
        status ? "bg-green-50" : "bg-red-50"
      } transition-colors duration-500`}
    >
      <div
        className={`w-full p-10 rounded-3xl shadow-xl text-center transition-colors duration-500 ${
          status ? "bg-green-600 text-white" : "bg-red-600 text-white"
        }`}
      >
        <h1 className="text-3xl font-extrabold mb-8">Pengaturan Status SPMB</h1>

        {error && (
          <div className="mb-8 bg-red-100 text-red-700 px-4 py-3 rounded-md">
            Error: {error}
          </div>
        )}

        <div className="flex flex-col items-center mb-8">
          <div
            className={`flex items-center justify-center w-24 h-24 rounded-full shadow-lg mb-8 transition-colors duration-500 ${
              status ? "bg-white" : "bg-gray-200"
            }`}
          >
            {status ? (
              <BsCheckCircleFill className="text-green-600 text-6xl" />
            ) : (
              <BsXCircleFill className="text-red-600 text-6xl" />
            )}
          </div>

          <p className="text-2xl font-semibold mb-8">
            Status:{" "}
            <span className={status ? "text-green-200" : "text-red-200"}>
              {status ? "Buka" : "Tutup"}
            </span>
          </p>

          <label className="relative inline-flex items-center cursor-pointer mb-8">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
            <div
              className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                status ? "translate-x-6" : ""
              }`}
            />
          </label>
        </div>

        <button
          onClick={updateStatus}
          disabled={saving}
          className={`w-full py-3 rounded-full text-lg font-bold transition-all ${
            saving
              ? "bg-green-300 cursor-not-allowed"
              : status
              ? "bg-green-700 hover:bg-green-800"
              : "bg-red-700 hover:bg-red-800"
          }`}
        >
          {saving ? "Menyimpan..." : "Simpan Status"}
        </button>
      </div>
    </div>
  );
};

export default PPDBStatus;
