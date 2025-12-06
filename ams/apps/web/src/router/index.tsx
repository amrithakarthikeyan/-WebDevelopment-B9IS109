import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { DashboardPage } from "../pages/Dashboard";
import { AssetsPage } from "../pages/Assets";
import { UsersPage } from "../pages/Users";
import { SettingsPage } from "../pages/Settings";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Default → login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/assets" element={<AssetsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/settings" element={<SettingsPage />} />

      {/* Catch-all */}
      <Route path="*" element={<div>404 - Page not found</div>} />
    </Routes>
  );
};
