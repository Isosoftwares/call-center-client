// ================================
// COMPONENTS/PHONENUMBERS/PHONENUMBERCARD.JS - Phone Number Card
// ================================
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { phoneNumbersAPI } from "../../services/api";
import { toast } from "react-toastify";
import {
  DevicePhoneMobileIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const PhoneNumberCard = ({ phoneNumber }) => {
  const [showSettings, setShowSettings] = useState(false);
  const queryClient = useQueryClient();

  const { data: stats } = useQuery({
    queryKey: ["phone-number-stats", phoneNumber._id],
    queryFn: () => phoneNumbersAPI.getStats(phoneNumber._id, { period: "30d" }),
  });

  const releaseMutation = useMutation({
    mutationFn: () => phoneNumbersAPI.releaseNumber(phoneNumber._id),
    onSuccess: () => {
      toast.success("Phone number released successfully");
      queryClient.invalidateQueries(["phone-numbers"]);
    },
    onError: (error) => {
      toast.error(error.error?.message || "Failed to release number");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updates) =>
      phoneNumbersAPI.updateNumber(phoneNumber._id, updates),
    onSuccess: () => {
      toast.success("Phone number updated successfully");
      queryClient.invalidateQueries(["phone-numbers"]);
      setShowSettings(false);
    },
    onError: (error) => {
      toast.error(error.error?.message || "Failed to update number");
    },
  });

  const handleRelease = () => {
    if (
      window.confirm(
        "Are you sure you want to release this phone number? This action cannot be undone."
      )
    ) {
      releaseMutation.mutate();
    }
  };

  const handleToggleActive = () => {
    updateMutation.mutate({ isActive: !phoneNumber.isActive });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 rounded-full p-2">
            <DevicePhoneMobileIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {phoneNumber.phoneNumber}
            </h3>
            <p className="text-sm text-gray-500">
              {phoneNumber.friendlyName || "No name"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-400 hover:text-gray-600"
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleRelease}
            disabled={releaseMutation.isPending}
            className="text-red-400 hover:text-red-600"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Status</span>
          <button
            onClick={handleToggleActive}
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              phoneNumber.isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {phoneNumber.isActive ? "Active" : "Inactive"}
          </button>
        </div>

        {phoneNumber.assignment?.purpose && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Purpose</span>
            <span className="font-medium">
              {phoneNumber.assignment.purpose}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Capabilities</span>
          <div className="flex space-x-1">
            {phoneNumber.capabilities?.voice && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                Voice
              </span>
            )}
            {phoneNumber.capabilities?.sms && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                SMS
              </span>
            )}
            {phoneNumber.capabilities?.mms && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                MMS
              </span>
            )}
          </div>
        </div>

        {stats?.data && (
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <ChartBarIcon className="h-4 w-4 mr-1" />
              Usage (30 days)
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>
                <div className="font-medium">
                  {stats.data.statistics.totalCalls || 0}
                </div>
                <div className="text-xs">Total Calls</div>
              </div>
              <div>
                <div className="font-medium">
                  {Math.round((stats.data.statistics.totalDuration || 0) / 60)}m
                </div>
                <div className="text-xs">Total Duration</div>
              </div>
            </div>
          </div>
        )}

        {phoneNumber.usage?.lastUsed && (
          <div className="text-xs text-gray-500">
            Last used:{" "}
            {new Date(phoneNumber.usage.lastUsed).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Friendly Name
              </label>
              <input
                type="text"
                defaultValue={phoneNumber.friendlyName}
                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                onBlur={(e) => {
                  if (e.target.value !== phoneNumber.friendlyName) {
                    updateMutation.mutate({ friendlyName: e.target.value });
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purpose
              </label>
              <select
                defaultValue={phoneNumber.assignment?.purpose || ""}
                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => {
                  updateMutation.mutate({
                    assignment: {
                      ...phoneNumber.assignment,
                      purpose: e.target.value,
                    },
                  });
                }}
              >
                <option value="">Select Purpose</option>
                <option value="customer_support">Customer Support</option>
                <option value="sales">Sales</option>
                <option value="technical_support">Technical Support</option>
                <option value="billing">Billing</option>
                <option value="main">Main Line</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberCard;
