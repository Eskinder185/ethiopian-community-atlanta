import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAdminLanguage } from "../../context/AdminLanguageContext";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import ErrorBoundary from "../ErrorBoundary";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { adminT } = useAdminLanguage();

  return (
    <div className="min-h-screen bg-ecaa-cream">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-ecaa-green-950/40 lg:hidden"
          aria-label={adminT("header.closeMenu")}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="lg:pl-64">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <ErrorBoundary compact>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
