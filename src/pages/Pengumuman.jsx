import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import PengumumanCard from "../components/Pengumuman/PengumumanCard";
import PengumumanFilter from "../components/Pengumuman/PengumumanFilter";
import { supabase } from "../utils/supabase";

const Pengumuman = () => {
  const [pengumumanList, setPengumumanList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(3); // awalnya tampil 3 card

  useEffect(() => {
    const fetchPengumuman = async () => {
      const { data, error } = await supabase
        .from("Pengumuman")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else {
        setPengumumanList(data);

        // Ambil daftar kategori unik
        const uniqueCategories = [
          ...new Set(data.map((item) => item.kategori)),
        ];
        setCategories(uniqueCategories);
      }
    };

    fetchPengumuman();
  }, []);

  const filteredPengumuman = pengumumanList.filter((pengumuman) =>
    selectedCategory ? pengumuman.kategori === selectedCategory : true
  );

  // Ambil item yang ditampilkan berdasarkan visibleCount
  const visiblePengumuman = filteredPengumuman.slice(0, visibleCount);

  // Handler tombol load more
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-16 px-4 md:px-20 pt-28">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-8">
          Pengumuman
        </h1>
        <PengumumanFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {filteredPengumuman.length === 0 ? (
          <p className="text-center text-gray-500 mt-12 text-lg">
            Belum ada pengumuman.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePengumuman.map((pengumuman) => (
                <PengumumanCard key={pengumuman.id} pengumuman={pengumuman} />
              ))}
            </div>

            {/* Tombol Load More */}
            {visibleCount < filteredPengumuman.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-2 bg-green-800 text-white rounded hover:bg-green-700 transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Pengumuman;
