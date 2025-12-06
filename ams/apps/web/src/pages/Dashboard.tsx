import React from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { useHealth } from "../hooks/useHealth";

export const DashboardPage: React.FC = () => {
  const { data, isLoading, isError } = useHealth();

  let apiStatusText = "Checking…";
  let apiStatusColor = "text-slate-500";

  if (isLoading) {
    apiStatusText = "Checking API…";
  } else if (isError) {
    apiStatusText = "Offline";
    apiStatusColor = "text-red-600";
  } else if (data?.status === "ok") {
    apiStatusText = "Online";
    apiStatusColor = "text-emerald-600";
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <div className="bg-white rounded-lg shadow p-4 md:col-span-1">
          <h2 className="text-sm font-semibold mb-2 text-slate-600">
            API Status
          </h2>
          <p className={`text-xl font-bold ${apiStatusColor}`}>
            {apiStatusText}
          </p>
          {data?.message && (
            <p className="mt-1 text-xs text-slate-500">{data.message}</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-sm font-semibold mb-2 text-slate-600">
            Total Assets
          </h2>
          <p className="text-2xl font-bold text-slate-900">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-sm font-semibold mb-2 text-slate-600">
            Assigned
          </h2>
          <p className="text-2xl font-bold text-slate-900">0</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-sm font-semibold mb-2 text-slate-600">
            In Stock
          </h2>
          <p className="text-2xl font-bold text-slate-900">0</p>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        The API status card above is powered by <code>/api/health</code> from
        your backend. Later, you’ll fetch real asset statistics for these cards.
      </p>
    </DashboardLayout>
  );
};
