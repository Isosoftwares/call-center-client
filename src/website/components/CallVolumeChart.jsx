// ================================
// COMPONENTS/DASHBOARD/CALLVOLUMECHART.JS - Call Volume Chart
// ================================
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { analyticsAPI } from "../../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CallVolumeChart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["call-volume", "24h"],
    queryFn: () =>
      analyticsAPI.getCallVolume({ period: "24h", interval: "hour" }),
    refetchInterval: 300000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Call Volume (24h)
        </h3>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const chartData = data?.data?.data || [];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Call Volume (24h)
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) =>
                new Date(value).toLocaleTimeString([], { hour: "2-digit" })
              }
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleString()}
              formatter={(value, name) => [
                value,
                name === "totalCalls" ? "Total Calls" : name,
              ]}
            />
            <Line
              type="monotone"
              dataKey="totalCalls"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CallVolumeChart;
