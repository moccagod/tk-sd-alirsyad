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
import Login from "./admin/Login";
import Dashboard from "./admin/pages/Dashboard";
import { useEffect, useState } from "react";
import { checkAuth } from "./utils/supabase";

import ListPengumuman from "./admin/pages/Pengumuman/ListPengumuman";
import EditPengumuman from "./admin/pages/Pengumuman/EditPengumuman";
import AddPengumuman from "./admin/pages/Pengumuman/AddPengumuman";

import EditBerita from "./admin/pages/Berita/EditBerita";
import ListBerita from "./admin/pages/Berita/ListBerita";
import AddBerita from "./admin/pages/Berita/AddBerita";
import AdminLayout from "./admin/pages/AdminLayout";
import AccountSettings from "./admin/pages/AccountSetting";

const PrivateRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const session = await checkAuth();
      setAuthenticated(!!session);
      setLoading(false);
    };
    verifyAuth();
  }, []);

  if (loading) return null;
  return authenticated ? children : <Navigate to="/admin/login" />;
};

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
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />

          {/* Berita */}
          <Route path="berita/add" element={<AddBerita />} />
          <Route path="berita/edit" element={<EditBerita />} />
          <Route path="berita/list" element={<ListBerita />} />

          {/* Pengumuman */}
          <Route path="pengumuman/add" element={<AddPengumuman />} />
          <Route path="pengumuman/edit" element={<EditPengumuman />} />
          <Route path="pengumuman/list" element={<ListPengumuman />} />

          {/* Users */}
          <Route path="account" element={<AccountSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
