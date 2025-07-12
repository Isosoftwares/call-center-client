// ================================
// PAGES/CALLHISTORY.JS - Call History Page
// ================================
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { callsAPI } from "../services/api";
import CallHistoryTable from "./components/CallHistoryTable";
import CallHistoryFilters from "./components/CallHistoryFilters";

const CallHistory = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    status: "",
    phoneNumber: "",
    startDate: "",
    endDate: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["call-history", filters],
    queryFn: () => callsAPI.getCallHistory(filters),
    keepPreviousData: true,
  });

  console.log(data);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Call History</h1>
      </div>

      <CallHistoryFilters filters={filters} onFiltersChange={setFilters} />

      <CallHistoryTable
        data={data?.data?.data?.calls}
        isLoading={isLoading}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  );
};

export default CallHistory;
