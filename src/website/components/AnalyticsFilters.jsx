// ================================
// COMPONENTS/ANALYTICS/ANALYTICSFILTERS.JS - Analytics Filters
// ================================
import React from "react";

const AnalyticsFilters = ({ period, onPeriodChange }) => {
  const periods = [
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
  ];

  return (
    <div className="flex items-center space-x-4">
      <label className="text-sm font-medium text-gray-700">Period:</label>
      <select
        value={period}
        onChange={(e) => onPeriodChange(e.target.value)}
        className="border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
      >
        {periods.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AnalyticsFilters;
