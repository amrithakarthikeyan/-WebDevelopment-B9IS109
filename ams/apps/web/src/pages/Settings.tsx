import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout title="Settings">
      <p className="text-sm text-slate-600">
        This is a placeholder for application settings. Later, you can manage
        email notifications, asset categories, and other configuration here.
      </p>
    </DashboardLayout>
  );
};
