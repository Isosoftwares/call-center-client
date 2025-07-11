// ================================
// COMPONENTS/ANALYTICS/AGENTPERFORMANCECHART.JS - Agent Performance Chart
// ================================
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AgentPerformanceChart = ({ data, isLoading, period }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Agent Performance
        </h3>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const chartData = (data?.agents || []).slice(0, 10).map((agent) => ({
    name: agent.agentName || "Unknown",
    totalCalls: agent.totalCalls || 0,
    completionRate: Math.round(agent.completionRate || 0),
    avgCallDuration: Math.round((agent.avgCallDuration || 0) / 60), // Convert to minutes
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Top Agent Performance ({period})
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 10 }}
              width={80}
            />
            <Tooltip
              formatter={(value, name) => [
                value,
                name === "totalCalls"
                  ? "Total Calls"
                  : name === "completionRate"
                  ? "Completion Rate (%)"
                  : name === "avgCallDuration"
                  ? "Avg Duration (min)"
                  : name,
              ]}
            />
            <Bar dataKey="totalCalls" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AgentPerformanceChart;