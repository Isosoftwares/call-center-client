// ================================
// PAGES/DASHBOARD.JS - Main Dashboard
// ================================
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { analyticsAPI } from "../services/api";
import DashboardStats from "./components/DashboardStats";
import RealTimeMetrics from "./components/RealTimeMetrics";
import CallVolumeChart from "./components/CallVolumeChart";
import AgentStatusOverview from "./components/AgentStatusOverview";
import ActiveCallsList from "./components/ActiveCallsList";
import QueueStatus from "./components/QueueStatus";


const Dashboard = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboard", "24h"],
    queryFn: () => analyticsAPI.getDashboard({ period: "24h" }),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Real-time metrics */}
      <RealTimeMetrics />

      {/* Dashboard stats */}
      <DashboardStats data={dashboardData?.data} />

      {/* Charts and lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <CallVolumeChart />
          <AgentStatusOverview />
        </div>
        <div className="space-y-6">
          <ActiveCallsList />
          <QueueStatus />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
