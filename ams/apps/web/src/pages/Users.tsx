import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const UsersPage: React.FC = () => {
  return (
    <DashboardLayout title="Users">
      <p className="text-sm text-slate-600">
        This is a placeholder for the Users management page. You can add user
        list, roles, and permissions here later.
      </p>
    </DashboardLayout>
  );
};
