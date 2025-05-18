import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Sambutan from "./pages/Profile/Sambutan";
import VisiMisi from "./pages/Profile/VisiMisi";
import GuruTendik from "./pages/Profile/GuruTendik";
import ProgramSekolah from "./pages/Akademik/ProgramSekolah";
import Kurikulum from "./pages/Akademik/Kurikulum";
import Ekstrakurikuler from "./pages/Akademik/Ekstrakurikuler";
import Kalender from "./pages/Akademik/Kalender";
import Prestasi from "./pages/Akademik/Prestasi";
import Pengumuman from "./pages/Pengumuman";
import Berita from "./pages/Berita";
import Kontak from "./pages/Kontak";
import PPDB from "./pages/PPDB";
import Dashboard from "./admin/Dashboard";
import Login from "./admin/Login";
import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";

// Private Route Wrapper
function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(data.session !== null);
    };
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile/sambutan" element={<Sambutan />} />
        <Route path="/profile/visi-misi" element={<VisiMisi />} />
        <Route path="/profile/guru-tendik" element={<GuruTendik />} />
        <Route path="/akademik/program-sekolah" element={<ProgramSekolah />} />
        <Route path="/akademik/kurikulum" element={<Kurikulum />} />
        <Route path="/akademik/ekstrakurikuler" element={<Ekstrakurikuler />} />
        <Route path="/akademik/kalender" element={<Kalender />} />
        <Route path="/akademik/prestasi" element={<Prestasi />} />
        <Route path="/pengumuman" element={<Pengumuman />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/ppdb" element={<PPDB />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
