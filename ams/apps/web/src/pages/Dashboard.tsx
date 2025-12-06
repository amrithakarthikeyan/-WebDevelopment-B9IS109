import React from "react";
import { Link } from "react-router-dom";

export const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">AMS Dashboard</h1>
        <nav className="space-x-4 text-sm">
          <Link to="/dashboard" className="hover:underline">
            Overview
          </Link>
          <span className="text-slate-400">|</span>
          <Link to="/login" className="hover:underline">
            Logout
          </Link>
        </nav>
      </header>

      <main className="p-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-sm font-semibold mb-2">Total Assets</h2>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-sm font-semibold mb-2">Assigned</h2>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-sm font-semibold mb-2">In Stock</h2>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-500">
          This is just a placeholder dashboard. Next, you’ll connect it to your
          backend and show real asset data here.
        </p>
      </main>
    </div>
  );
};
