// ================================
// PAGES/CALLMANAGEMENT.JS - Call Management Page
// ================================
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { callsAPI } from "../services/api";
import CallInterface from "./components/CallInterface";
import ActiveCallsList from "./components/ActiveCallsList";
import { PlusIcon } from "@heroicons/react/24/outline";
import MakeCallModal from "./components/MakeCallModal";

const CallManagement = () => {
  const [showMakeCall, setShowMakeCall] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  const { data: activeCalls } = useQuery({
    queryKey: ["active-calls"],
    queryFn: callsAPI.getActiveCalls,
    refetchInterval: 5000,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Call Management</h1>
        <button
          onClick={() => setShowMakeCall(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Make Call</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Calls */}
        <ActiveCallsList />

        {/* Call Interface */}
        {selectedCall && (
          <CallInterface
            call={selectedCall}
            onClose={() => setSelectedCall(null)}
          />
        )}
      </div>

      {/* Make Call Modal */}
      {showMakeCall && (
        <MakeCallModal
          isOpen={showMakeCall}
          onClose={() => setShowMakeCall(false)}
        />
      )}
    </div>
  );
};

export default CallManagement;
