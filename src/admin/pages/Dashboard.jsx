import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

const Dashboard = () => {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user profile:", error);
        return;
      }
      setDisplayName(user.user?.user_metadata?.display_name || "Admin");
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>
          Halo <span className="font-semibold">{displayName}</span>! Selamat datang di halaman admin.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
