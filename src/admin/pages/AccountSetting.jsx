// src/admin/pages/AccountSettings.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

const AccountSettings = () => {
  const [displayName, setDisplayName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        showMessage("Error fetching user profile", "error");
        console.error(error);
        return;
      }
      setDisplayName(user.user?.user_metadata?.display_name || "");
    };

    fetchUserProfile();
  }, []);

  // Fungsi untuk menampilkan pesan dengan auto-hide
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);

    // Auto-hide setelah 3 detik
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      // Update display name
      const { error: updateError } = await supabase.auth.updateUser({
        data: { display_name: displayName },
      });

      if (updateError) throw updateError;

      showMessage("Profile updated successfully!", "success");
    } catch (error) {
      console.error(error);
      showMessage("Failed to update profile", "error");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      if (newPassword.trim() === "") {
        showMessage("Password cannot be empty", "error");
        return;
      }

      const { error: passwordError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (passwordError) throw passwordError;

      showMessage("Password updated successfully!", "success");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      showMessage("Failed to update password", "error");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Account Settings</h2>

      {/* Pesan Respon */}
      {message && (
        <p
          className={`mb-4 text-sm font-semibold px-4 py-2 rounded transition-all duration-300 ${
            messageType === "success"
              ? "text-green-700 bg-green-100 border border-green-300"
              : "text-red-700 bg-red-100 border border-red-300"
          }`}
        >
          {message}
        </p>
      )}

      {/* Form Display Name */}
      <form onSubmit={handleUpdateProfile} className="mb-6">
        <label className="block mb-2">Display Name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition cursor-pointer"
        >
          Update Display Name
        </button>
      </form>

      {/* Form Password */}
      <form onSubmit={handleUpdatePassword}>
        <label className="block mb-2">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition cursor-pointer"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
