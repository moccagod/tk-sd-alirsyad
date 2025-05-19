import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AnimatedPage from "../../components/AnimatedPage";

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Tambahkan key berdasarkan path untuk memastikan animasi selalu terjadi */}
        <AnimatedPage key={location.pathname}>
          <Outlet />
        </AnimatedPage>
      </div>
    </div>
  );
};

export default AdminLayout;
