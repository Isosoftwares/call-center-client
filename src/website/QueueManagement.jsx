// ================================
// PAGES/QUEUEMANAGEMENT.JS - Queue Management Page
// ================================
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queuesAPI } from "../services/api";
import QueuesList from "./components/QueuesList";
import CreateQueueModal from "./components/CreateQueueModal";
import { PlusIcon } from "@heroicons/react/24/outline";

const QueueManagement = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data: queues, isLoading } = useQuery({
    queryKey: ["queues"],
    queryFn: queuesAPI.getQueues,
    refetchInterval: 30000,
  });

  console.log(queues);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Queue Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create Queue</span>
        </button>
      </div>

      <QueuesList queues={queues?.data || []} isLoading={isLoading} />

      {showCreateModal && (
        <CreateQueueModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default QueueManagement;
