import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../utils/supabase";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* Form Login hanya tampil di desktop (≥1024px) */}
      <div className="hidden lg:flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
            Admin Login
          </h2>
          {error && (
            <p className="text-red-600 mb-4 bg-red-100 p-3 rounded">{error}</p>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                required
              />
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <div className="mb-6 relative flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-indigo-400 transition">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pr-10 text-gray-700 focus:outline-none bg-transparent"
                  required
                />
                <button
                  type="button"
                  className="cursor-pointer absolute right-3 text-gray-500 hover:text-indigo-600 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md shadow-md transition"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-block text-indigo-600 hover:text-indigo-800 font-medium transition"
            >
              &larr; Kembali ke Halaman Utama
            </Link>
          </div>
        </div>
      </div>

      {/* Pesan untuk perangkat selain desktop (mobile/tablet) */}
      <div className="flex lg:hidden flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-6 text-center px-4">
        <h1 className="text-3xl font-extrabold mb-4 text-gray-800">
          Akses Terbatas
        </h1>
        <p className="text-gray-700 max-w-sm mb-8">
          Halaman ini hanya bisa dibuka di perangkat desktop. Silakan akses
          kembali menggunakan komputer atau laptop.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition"
        >
          &larr; Kembali ke Halaman Utama
        </Link>
      </div>
    </>
  );
};

export default Login;
