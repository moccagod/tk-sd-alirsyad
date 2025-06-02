import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";
import { checkAuth } from "./utils/supabase";
import { AnimatePresence } from "framer-motion";

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

import ListPengumuman from "./admin/pages/Pengumuman/ListPengumuman";
import EditPengumuman from "./admin/pages/Pengumuman/EditPengumuman";
import AddPengumuman from "./admin/pages/Pengumuman/AddPengumuman";

import AdminLayout from "./admin/pages/AdminLayout";
import AccountSettings from "./admin/pages/AccountSetting";
import PPDBStatus from "./admin/pages/PPDBStatus";

import AnimatedPage from "./components/AnimatedPage";
import AddBerita from "./admin/pages/Berita/AddBerita";
import EditBerita from "./admin/pages/Berita/EditBerita";
import ListBerita from "./admin/pages/Berita/ListBerita";
import DetailPengumuman from "./pages/Pengumuman/DetailPengumuman";
import ManageComments from "./admin/pages/Pengumuman/ManageComments";
import AddGuru from "./admin/pages/Guru/AddGuru";
import ListGuru from "./admin/pages/Guru/ListGuru";
import EditGuru from "./admin/pages/Guru/EditGuru";

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

// Wrapper untuk Routes agar animasi transisi berjalan mulus
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <AnimatedPage>
              <LandingPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/profile/sambutan"
          element={
            <AnimatedPage>
              <Sambutan />
            </AnimatedPage>
          }
        />
        <Route
          path="/profile/visi-misi"
          element={
            <AnimatedPage>
              <VisiMisi />
            </AnimatedPage>
          }
        />
        <Route
          path="/profile/guru-tendik"
          element={
            <AnimatedPage>
              <GuruTendik />
            </AnimatedPage>
          }
        />
        <Route
          path="/akademik/program-sekolah"
          element={
            <AnimatedPage>
              <ProgramSekolah />
            </AnimatedPage>
          }
        />
        <Route
          path="/akademik/kurikulum"
          element={
            <AnimatedPage>
              <Kurikulum />
            </AnimatedPage>
          }
        />
        <Route
          path="/akademik/ekstrakurikuler"
          element={
            <AnimatedPage>
              <Ekstrakurikuler />
            </AnimatedPage>
          }
        />
        <Route
          path="/akademik/kalender"
          element={
            <AnimatedPage>
              <Kalender />
            </AnimatedPage>
          }
        />
        <Route
          path="/akademik/prestasi"
          element={
            <AnimatedPage>
              <Prestasi />
            </AnimatedPage>
          }
        />
        {/* Pengumuman */}
        <Route
          path="/pengumuman"
          element={
            <AnimatedPage>
              <Pengumuman />
            </AnimatedPage>
          }
        />
        <Route
          path="/pengumuman/:id"
          element={
            <AnimatedPage>
              <DetailPengumuman />
            </AnimatedPage>
          }
        />
        <Route
          path="/berita"
          element={
            <AnimatedPage>
              <Berita />
            </AnimatedPage>
          }
        />
        <Route
          path="/kontak"
          element={
            <AnimatedPage>
              <Kontak />
            </AnimatedPage>
          }
        />
        <Route
          path="/spmb"
          element={
            <AnimatedPage>
              <PPDB />
            </AnimatedPage>
          }
        />
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Routes */}
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
          <Route path="berita/edit/:id" element={<EditBerita />} />
          <Route path="berita/list" element={<ListBerita />} />

          {/* Pengumuman */}
          <Route path="pengumuman/add" element={<AddPengumuman />} />
          <Route path="pengumuman/list" element={<ListPengumuman />} />
          <Route path="pengumuman/edit/:id" element={<EditPengumuman />} />
          <Route path="pengumuman/comments" element={<ManageComments />} />

          {/* Guru */}
          <Route path="guru/add" element={<AddGuru />} />
          <Route path="guru/list" element={<ListGuru />} />
          <Route path="guru/edit/:id" element={<EditGuru />} />

          {/* Account Settings */}
          <Route path="account" element={<AccountSettings />} />

          {/* PPDB Status */}
          <Route path="spmb" element={<PPDBStatus />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
