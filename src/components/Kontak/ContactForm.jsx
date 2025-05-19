import React, { useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const formData = new FormData(e.target);
      const response = await fetch(
        "https://formsubmit.co/dextergod90@gmail.com",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form bg-white p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-6 text-green-800">Kirim Pesan</h2>

      {/* Metadata */}
      <input type="hidden" name="_subject" value="Pesan dari Form Kontak" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />

      {/* Nama Lengkap */}
      <label className="block mb-2 font-semibold" htmlFor="name">
        Nama Lengkap
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Nama Lengkap"
        required
        className="w-full p-4 mb-4 border rounded-lg"
      />

      {/* Email */}
      <label className="block mb-2 font-semibold" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
        className="w-full p-4 mb-4 border rounded-lg"
      />

      {/* Nomor Whatsapp */}
      <label className="block mb-2 font-semibold" htmlFor="whatsapp">
        Nomor Whatsapp
      </label>
      <input
        type="tel"
        name="whatsapp"
        id="whatsapp"
        placeholder="Nomor Whatsapp"
        required
        className="w-full p-4 mb-4 border rounded-lg"
      />

      {/* Pesan */}
      <label className="block mb-2 font-semibold" htmlFor="message">
        Pesan
      </label>
      <textarea
        name="message"
        id="message"
        placeholder="Pesan"
        rows="6"
        required
        className="w-full p-4 mb-4 border rounded-lg"
      />

      {/* Tombol Kirim */}
      <button
        type="submit"
        disabled={status === "loading"}
        className={`cursor-pointer w-full p-4 rounded-lg font-bold text-white transition-all ${
          status === "loading"
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
      </button>

      {/* Pesan Sukses atau Gagal */}
      {status === "success" && (
        <p className="mt-4 text-green-600 font-semibold">
          Pesan berhasil dikirim!
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600 font-semibold">
          Terjadi kesalahan, silakan coba lagi.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
