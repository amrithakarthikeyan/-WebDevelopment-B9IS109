import React from "react";
import { Link, useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title = "Dashboard",
  children,
}) => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-slate-900 text-white"
      : "text-slate-300 hover:bg-slate-800 hover:text-white";

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col">
        <div className="px-6 py-4 border-b border-slate-800">
          <h1 className="text-lg font-semibold">AMS</h1>
          <p className="text-xs text-slate-400">
            Asset Management System
          </p>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 text-sm">
          <Link
            to="/dashboard"
            className={`block rounded-md px-3 py-2 ${isActive("/dashboard")}`}
          >
            Dashboard
          </Link>
          <Link
            to="/assets"
            className={`block rounded-md px-3 py-2 ${isActive("/assets")}`}
          >
            Assets
          </Link>
          <Link
            to="/users"
            className={`block rounded-md px-3 py-2 ${isActive("/users")}`}
          >
            Users
          </Link>
          <Link
            to="/settings"
            className={`block rounded-md px-3 py-2 ${isActive("/settings")}`}
          >
            Settings
          </Link>
        </nav>

        <div className="px-4 py-3 border-t border-slate-800 text-xs text-slate-400">
          <p>Logged in as</p>
          <p className="font-medium text-slate-200">Demo User</p>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-sm text-slate-600 hover:text-slate-900"
            onClick={() => {
              // TODO: clear auth later
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
