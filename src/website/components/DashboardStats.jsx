// ================================
// COMPONENTS/DASHBOARD/DASHBOARDSTATS.JS - Stats Cards
// ================================
import React from "react";
import {
  PhoneIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">
                {typeof value === "number" ? value.toLocaleString() : value}
              </div>
              {change && (
                <div
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {changeType === "increase" ? "+" : ""}
                  {change}%
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const DashboardStats = ({ data }) => {
  const stats = [
    {
      title: "Total Calls Today",
      value: data?.calls?.totalCalls || 0,
      change: 12,
      changeType: "increase",
      icon: PhoneIcon,
      color: "text-blue-500",
    },
    {
      title: "Active Calls",
      value: data?.calls?.activeCalls || 0,
      icon: PhoneIcon,
      color: "text-green-500",
    },
    {
      title: "Available Agents",
      value: data?.agents?.available || 0,
      icon: UserGroupIcon,
      color: "text-purple-500",
    },
    {
      title: "Avg Wait Time",
      value: data?.calls?.avgWaitTime
        ? `${Math.round(data.calls.avgWaitTime)}s`
        : "0s",
      change: -8,
      changeType: "decrease",
      icon: ClockIcon,
      color: "text-orange-500",
    },
    {
      title: "Completion Rate",
      value: data?.calls?.completionRate
        ? `${Math.round(data.calls.completionRate)}%`
        : "0%",
      change: 5,
      changeType: "increase",
      icon: CheckCircleIcon,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;