// ================================
// COMPONENTS/DASHBOARD/REALTIMEMETRICS.JS - Real-time Updates
// ================================
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { analyticsAPI } from "../../services/api";
import useSocket from "../../hooks/useSocket";

const RealTimeMetrics = () => {
  const [metrics, setMetrics] = useState({
    activeCalls: 0,
    queuedCalls: 0,
    availableAgents: 0,
  });

  const { socket } = useSocket();

  const { data } = useQuery({
    queryKey: ["realtime-metrics"],
    queryFn: () => analyticsAPI.getDashboard({ period: "1h" }),
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (data?.data) {
      setMetrics({
        activeCalls: data.data.calls?.activeCalls || 0,
        queuedCalls: data.data.calls?.queuedCalls || 0,
        availableAgents: data.data.agents?.available || 0,
      });
    }
  }, [data]);

  useEffect(() => {
    if (socket) {
      socket.on("call:updated", (data) => {
        // Update metrics in real-time
        if (data.status === "in-progress") {
          setMetrics((prev) => ({
            ...prev,
            activeCalls: prev.activeCalls + 1,
          }));
        } else if (data.status === "completed") {
          setMetrics((prev) => ({
            ...prev,
            activeCalls: Math.max(0, prev.activeCalls - 1),
          }));
        }
      });

      socket.on("queue:updated", (data) => {
        setMetrics((prev) => ({ ...prev, queuedCalls: data.queueSize || 0 }));
      });

      return () => {
        socket.off("call:updated");
        socket.off("queue:updated");
      };
    }
  }, [socket]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Real-time Status
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">
            {metrics.activeCalls}
          </div>
          <div className="text-sm text-gray-500">Active Calls</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-600">
            {metrics?.queuedCalls}
          </div>
          <div className="text-sm text-gray-500">Queued Calls</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">
            {metrics.availableAgents}
          </div>
          <div className="text-sm text-gray-500">Available Agents</div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMetrics;