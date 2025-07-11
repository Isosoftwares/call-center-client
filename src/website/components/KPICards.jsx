// ================================
// COMPONENTS/ANALYTICS/KPICARDS.JS - KPI Cards
// ================================
import React from "react";
import {
  PhoneIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  } from "@heroicons/react/24/outline";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const KPICard = ({ title, value, trend, icon: Icon, color, format }) => {
  const formatValue = (val) => {
    if (!val && val !== 0) return "0";

    switch (format) {
      case "percentage":
        return `${Math.round(val)}%`;
      case "duration":
        return `${Math.round(val)}s`;
      case "number":
        return val.toLocaleString();
      default:
        return val;
    }
  };

  return (
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
                  {formatValue(value)}
                </div>
                {trend && (
                  <div
                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                      trend > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {trend > 0 ? (
                      <FaArrowTrendDown className="h-4 w-4 mr-1" />
                    ) : (
                      <FaArrowTrendUp className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(trend)}%
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

const KPICards = ({ data, period }) => {
  const kpis = [
    {
      title: "Total Calls",
      value: data?.calls?.totalCalls || 0,
      trend: 12,
      icon: PhoneIcon,
      color: "text-blue-500",
      format: "number",
    },
    {
      title: "Average Wait Time",
      value: data?.calls?.avgWaitTime || 0,
      trend: -8,
      icon: ClockIcon,
      color: "text-orange-500",
      format: "duration",
    },
    {
      title: "Completion Rate",
      value: data?.calls?.completionRate || 0,
      trend: 5,
      icon: CheckCircleIcon,
      color: "text-green-500",
      format: "percentage",
    },
    {
      title: "Abandonment Rate",
      value: data?.calls?.abandonmentRate || 0,
      trend: -3,
      icon: XCircleIcon,
      color: "text-red-500",
      format: "percentage",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default KPICards;
