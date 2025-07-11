// ================================
// PAGES/ANALYTICS.JS - Analytics Dashboard
// ================================
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { analyticsAPI } from "../services/api";
import CallVolumeChart from "./components/CallVolumeChart";
import AgentPerformanceChart from "./components/AgentPerformanceChart";
import QueuePerformanceTable from "./components/QueuePerformanceTable";
import KPICards from "./components/KPICards";
import AnalyticsFilters from "./components/AnalyticsFilters";

const Analytics = () => {
  const [period, setPeriod] = useState("30d");

  const { data: callVolume, isLoading: isLoadingVolume } = useQuery({
    queryKey: ["call-volume", period],
    queryFn: () => analyticsAPI.getCallVolume({ period, interval: "day" }),
  });

  const { data: agentPerformance, isLoading: isLoadingAgents } = useQuery({
    queryKey: ["agent-performance", period],
    queryFn: () => analyticsAPI.getAgentPerformance({ period }),
  });

  const { data: queuePerformance, isLoading: isLoadingQueues } = useQuery({
    queryKey: ["queue-performance", period],
    queryFn: () => analyticsAPI.getQueuePerformance({ period }),
  });

  const { data: dashboardData } = useQuery({
    queryKey: ["dashboard", period],
    queryFn: () => analyticsAPI.getDashboard({ period }),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <AnalyticsFilters period={period} onPeriodChange={setPeriod} />
      </div>

      {/* KPI Cards */}
      <KPICards data={dashboardData?.data} period={period} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CallVolumeChart
          data={callVolume?.data}
          isLoading={isLoadingVolume}
          period={period}
        />
        <AgentPerformanceChart
          data={agentPerformance?.data}
          isLoading={isLoadingAgents}
          period={period}
        />
      </div>

      {/* Queue Performance Table */}
      <QueuePerformanceTable
        data={queuePerformance?.data}
        isLoading={isLoadingQueues}
        period={period}
      />
    </div>
  );
};

export default Analytics;