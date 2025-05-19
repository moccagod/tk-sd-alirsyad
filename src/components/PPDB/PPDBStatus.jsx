// src/components/PPDB/PPDBStatus.jsx
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const PPDBStatus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPPDBStatus = async () => {
      try {
        const { data, error } = await supabase
          .from("PPDB")
          .select("status")
          .single();

        if (error) {
          console.error("Error fetching PPDB status:", error.message);
        } else if (data) {
          setIsOpen(data.status);
        }
      } catch (error) {
        console.error("Unexpected error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPPDBStatus();
  }, []);

  return (
    <div className="py-16 px-8 bg-gradient-to-br from-green-100 to-blue-50 rounded-lg shadow-lg relative overflow-hidden">
      {loading ? (
        <div className="text-center animate-pulse">
          <p className="text-gray-500">Loading status...</p>
        </div>
      ) : isOpen ? (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-20 h-20 text-green-600 animate-bounce"
            >
              <path d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 18a8 8 0 100-16 8 8 0 000 16zm-1-11h2v5h-2zm0 6h2v2h-2z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-green-700">PPDB Dibuka</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Pendaftaran siswa baru sedang dibuka. Segera daftarkan putra-putri
            Anda!
          </p>
          <div className="mt-6">
            <a
              href="/ppdb/pendaftaran"
              className="bg-green-600 text-white py-2 px-6 rounded-full shadow-md font-bold hover:bg-green-700 transition-all"
            >
              Daftar Sekarang
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-20 h-20 text-red-600 animate-pulse"
            >
              <path d="M12 2a10 10 0 110 20 10 10 0 010-20zm0 18a8 8 0 100-16 8 8 0 000 16zm-1-11h2v5h-2zm0 6h2v2h-2z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-red-700">PPDB Ditutup</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Mohon maaf, pendaftaran siswa baru saat ini ditutup.
          </p>
        </div>
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-50 to-blue-50 opacity-20 rounded-lg pointer-events-none" />
    </div>
  );
};

export default PPDBStatus;
