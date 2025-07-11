

// ================================
// COMPONENTS/DASHBOARD/ACTIVECALLSLIST.JS - Active Calls List
// ================================
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { callsAPI } from "../../services/api";
import { PhoneIcon, ClockIcon } from "@heroicons/react/24/outline";

const ActiveCallsList = () => {
  const { data: activeCalls, isLoading } = useQuery({
    queryKey: ["active-calls"],
    queryFn: callsAPI.getActiveCalls,
    refetchInterval: 5000,
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Active Calls</h3>
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

  const calls = activeCalls?.data || [];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Active Calls</h3>
        <span className="text-sm text-gray-500">{calls.length} active</span>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {calls.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <PhoneIcon className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2">No active calls</p>
          </div>
        ) : (
          calls.map((call) => (
            <div
              key={call._id}
              className="flex items-center space-x-3 p-3 border rounded-lg"
            >
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                  <PhoneIcon className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {call.phoneNumber}
                </p>
                <p className="text-sm text-gray-500">
                  {call.agentInfo?.agentName || "Unassigned"}
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="h-4 w-4 mr-1" />
                {call.callDetails?.startTime &&
                  Math.floor(
                    (new Date() - new Date(call.callDetails.startTime)) /
                      1000 /
                      60
                  )}
                m
              </div>
              <div
                className={`px-2 py-1 text-xs rounded-full ${
                  call.status === "in-progress"
                    ? "bg-green-100 text-green-800"
                    : call.status === "ringing"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {call.status}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActiveCallsList;