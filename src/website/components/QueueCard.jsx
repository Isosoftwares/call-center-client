// ================================
// COMPONENTS/QUEUES/QUEUECARD.JS - Individual Queue Card
// ================================
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { queuesAPI } from "../../services/api";
import {
  QueueListIcon,
  UsersIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const QueueCard = ({ queue }) => {
  const { data: stats } = useQuery({
    queryKey: ["queue-stats", queue.queueId],
    queryFn: () => queuesAPI.getStats(queue.queueId, { period: "24h" }),
    refetchInterval: 60000,
  });

  const getStrategyColor = (strategy) => {
    switch (strategy) {
      case "round_robin":
        return "bg-blue-100 text-blue-800";
      case "skills_based":
        return "bg-green-100 text-green-800";
      case "weighted":
        return "bg-purple-100 text-purple-800";
      case "priority":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStrategy = (strategy) => {
    return strategy.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 rounded-full p-2">
            <QueueListIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{queue.name}</h3>
            <p className="text-sm text-gray-500">{queue.queueId}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStrategyColor(
            queue.strategy
          )}`}
        >
          {formatStrategy(queue.strategy)}
        </span>
      </div>

      {queue.description && (
        <p className="text-sm text-gray-600 mb-4">{queue.description}</p>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <UsersIcon className="h-4 w-4 mr-2" />
            <span>Agents</span>
          </div>
          <span className="font-medium">{queue.agents?.length || 0}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <QueueListIcon className="h-4 w-4 mr-2" />
            <span>Current Queue</span>
          </div>
          <span className="font-medium">{queue.currentSize || 0}</span>
        </div>

        {stats?.data && (
          <>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <ClockIcon className="h-4 w-4 mr-2" />
                <span>Avg Wait Time</span>
              </div>
              <span className="font-medium">
                {stats.data.avgWaitTime
                  ? `${Math.round(stats.data.avgWaitTime)}s`
                  : "0s"}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <ChartBarIcon className="h-4 w-4 mr-2" />
                <span>Abandonment Rate</span>
              </div>
              <span className="font-medium">
                {stats.data.abandonmentRate
                  ? `${Math.round(stats.data.abandonmentRate)}%`
                  : "0%"}
              </span>
            </div>
          </>
        )}

        <div className="pt-3 border-t border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Configuration
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <div>Max Wait: {queue.configuration?.maxWaitTime || 0}s</div>
            <div>Max Size: {queue.configuration?.maxQueueSize || 0}</div>
            {queue.configuration?.skillsRequired &&
              queue.configuration.skillsRequired.length > 0 && (
                <div>
                  Skills: {queue.configuration.skillsRequired.join(", ")}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueCard;
