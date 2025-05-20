import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import BeritaCard from "../components/Berita/BeritaCard";
import BeritaFilter from "../components/Berita/BeritaFilter";
import { supabase } from "../utils/supabase";

const Berita = () => {
  const [beritaList, setBeritaList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchBerita = async () => {
      let { data: berita, error } = await supabase
        .from("Berita")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else {
        setBeritaList(berita);

        // Ambil daftar kategori unik
        const uniqueCategories = [
          ...new Set(berita.map((item) => item.kategori)),
        ];
        setCategories(uniqueCategories);
      }
    };

    fetchBerita();
  }, []);

  const filteredBerita = beritaList.filter((berita) =>
    selectedCategory ? berita.kategori === selectedCategory : true
  );

  // Berita yang akan ditampilkan sesuai visibleCount
  const visibleBerita = filteredBerita.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-16 px-4 md:px-20 pt-36">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-8">
          Berita
        </h1>
        <BeritaFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {filteredBerita.length === 0 ? (
          <p className="text-center text-gray-500 mt-12 text-lg">
            Belum ada berita.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleBerita.map((berita) => (
                <BeritaCard key={berita.id} berita={berita} />
              ))}
            </div>

            {visibleCount < filteredBerita.length && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="bg-green-800 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
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

export default Berita;
