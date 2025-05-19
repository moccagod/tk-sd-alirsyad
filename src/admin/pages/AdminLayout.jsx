import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AnimatedPage from "../../components/AnimatedPage";

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Tambahkan key berdasarkan path untuk memastikan animasi selalu terjadi */}
        <AnimatedPage key={location.pathname}>
          <Outlet />
        </AnimatedPage>
      </div>
    </div>
  );
};

export default AdminLayout;
