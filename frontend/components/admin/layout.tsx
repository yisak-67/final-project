import { useState } from "react";
import { Footer, Sidebar } from "@/components/common";
import { adminNavLinks } from "@/constants";
import AdminNavbar from "@/components/admin/adminNavbar";
import { ToastContainer } from "react-toastify";
import AdminSideBar from "./sidebar2";
interface LayoutPropos {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutPropos> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex justify-between flex-col h-screen">
      <div className="flex flex-row gap-14 ">
        <aside className="h-full fixed overflow-x-hidden z-10 top-0 left-0  ">
          <AdminSideBar />
        </aside>
        <main className="w-full h-full mb-10">
          <AdminNavbar />
          <div>{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
