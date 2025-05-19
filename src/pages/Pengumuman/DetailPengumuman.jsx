import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import CommentForm from "../../components/Pengumuman/CommentForm";
import CommentList from "../../components/Pengumuman/CommentList";
import { supabase } from "../../utils/supabase";

const DetailPengumuman = () => {
  const { id } = useParams();
  const [pengumuman, setPengumuman] = useState(null);
  const [comments, setComments] = useState([]);
  const [latestPengumuman, setLatestPengumuman] = useState([]);
  const [relatedPengumuman, setRelatedPengumuman] = useState([]);

  useEffect(() => {
    // Fetch pengumuman detail
    const fetchPengumuman = async () => {
      const { data, error } = await supabase
        .from("Pengumuman")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else setPengumuman(data);
    };

    // Fetch komentar
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("Pengumuman_Comments")
        .select("*")
        .eq("pengumuman_id", id)
        .order("created_at", { ascending: true });

      if (error) console.error(error);
      else setComments(data);
    };

    fetchPengumuman();
    fetchComments();
  }, [id]);

  // Fetch latest pengumuman dan related pengumuman setelah pengumuman detail didapat
  useEffect(() => {
    if (!pengumuman) return;

    const fetchLatestPengumuman = async () => {
      const { data, error } = await supabase
        .from("Pengumuman")
        .select("id, judul, tanggal")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) console.error(error);
      else setLatestPengumuman(data);
    };

    const fetchRelatedPengumuman = async () => {
      const { data, error } = await supabase
        .from("Pengumuman")
        .select("id, judul, tanggal")
        .eq("kategori", pengumuman.kategori)
        .neq("id", pengumuman.id) // exclude current pengumuman
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) console.error(error);
      else setRelatedPengumuman(data);
    };

    fetchLatestPengumuman();
    fetchRelatedPengumuman();
  }, [pengumuman]);

  const handleCommentAdded = () => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("Pengumuman_Comments")
        .select("*")
        .eq("pengumuman_id", id)
        .order("created_at", { ascending: true });

      if (error) console.error(error);
      else setComments(data);
    };

    fetchComments();
  };

  // Buat URL share media sosial
  const currentUrl = window.location.href;
  const shareText = encodeURIComponent(pengumuman ? pengumuman.judul : "");

  if (!pengumuman) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-16 px-8 md:px-20 pt-32 flex flex-col lg:flex-row gap-10">
        {/* Main Content */}
        <main className="flex-1">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {pengumuman.judul}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            {new Date(pengumuman.tanggal).toLocaleDateString()}
          </p>

          <img
            src={pengumuman.gambar}
            alt={pengumuman.judul}
            className="w-full h-96 object-cover mb-8 rounded-md shadow-md"
          />
          <p className="text-gray-700 mb-8 whitespace-pre-line">
            {pengumuman.isi}
          </p>

          {/* Share Buttons */}
          <div className="flex gap-4 mb-6">
            <a
              href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              aria-label="Share via WhatsApp"
            >
              WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              aria-label="Share via Facebook"
            >
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 text-white px-3 py-1 rounded hover:bg-sky-600 transition"
              aria-label="Share via Twitter"
            >
              Twitter
            </a>
          </div>

          {/* Komentar Section */}
          <div className="mt-12 bg-gray-100 p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Komentar</h2>
            <CommentForm
              pengumumanId={id}
              onCommentAdded={handleCommentAdded}
            />
            <CommentList
              comments={comments}
              pengumumanId={id}
              onCommentAdded={handleCommentAdded}
            />
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/3 space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-4 text-green-800">
              Pengumuman Terbaru
            </h3>
            <ul className="space-y-2">
              {latestPengumuman.length === 0 && (
                <p className="text-gray-500">Belum ada pengumuman terbaru.</p>
              )}
              {latestPengumuman.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/pengumuman/${item.id}`}
                    className="text-green-700 hover:underline"
                  >
                    {item.judul}
                  </Link>
                  <p className="text-xs text-gray-400">
                    {new Date(item.tanggal).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4 text-green-800">
              Pengumuman Terkait
            </h3>
            <ul className="space-y-2">
              {relatedPengumuman.length === 0 && (
                <p className="text-gray-500">Tidak ada pengumuman terkait.</p>
              )}
              {relatedPengumuman.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/pengumuman/${item.id}`}
                    className="text-green-700 hover:underline"
                  >
                    {item.judul}
                  </Link>
                  <p className="text-xs text-gray-400">
                    {new Date(item.tanggal).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPengumuman;