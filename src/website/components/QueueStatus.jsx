
// ================================
// COMPONENTS/DASHBOARD/QUEUESTATUS.JS - Queue Status Overview
// ================================
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { queuesAPI } from "../../services/api";
import {
  QueueListIcon,
  ClockIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const QueueStatus = () => {
  const { data: queues, isLoading } = useQuery({
    queryKey: ["queues"],
    queryFn: queuesAPI.getQueues,
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Queue Status</h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex space-x-3">
              <div className="rounded-full bg-gray-300 h-10 w-10"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const queuesList = queues?.data || [];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Queue Status</h3>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {queuesList.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <QueueListIcon className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2">No queues configured</p>
          </div>
        ) : (
          queuesList.map((queue) => (
            <div
              key={queue._id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{queue.name}</h4>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    (queue.currentSize || 0) > 10
                      ? "bg-red-100 text-red-800"
                      : (queue.currentSize || 0) > 5
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {queue.currentSize || 0} in queue
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <UsersIcon className="h-4 w-4 mr-1" />
                  <span>{queue.agents?.length || 0} agents</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>Max: {queue.configuration?.maxWaitTime || 0}s</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QueueStatus;