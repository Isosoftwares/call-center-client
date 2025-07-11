// ================================
// COMPONENTS/CALLS/CALLINTERFACE.JS - Call Control Interface
// ================================
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { callsAPI } from "../../services/api";
import { toast } from "react-toastify";
import {
  PhoneIcon,
  PhoneXMarkIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

const CallInterface = ({ call, onClose }) => {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(() => {
      if (call.callDetails?.startTime) {
        const elapsed = Math.floor(
          (new Date() - new Date(call.callDetails.startTime)) / 1000
        );
        setDuration(elapsed);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [call.callDetails?.startTime]);

  const endCallMutation = useMutation({
    mutationFn: () => callsAPI.endCall(call.callId),
    onSuccess: () => {
      toast.success("Call ended");
      queryClient.invalidateQueries(["active-calls"]);
      onClose();
    },
    onError: (error) => {
      toast.error(error.error?.message || "Failed to end call");
    },
  });

  const updateCallMutation = useMutation({
    mutationFn: (updates) => callsAPI.updateCall(call.callId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(["active-calls"]);
    },
  });

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    endCallMutation.mutate();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, this would control the actual call audio
  };

  const toggleHold = () => {
    setIsOnHold(!isOnHold);
    updateCallMutation.mutate({
      status: isOnHold ? "in-progress" : "on-hold",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {call.phoneNumber}
        </div>
        <div className="text-lg text-gray-600">
          {call.direction === "inbound" ? "Incoming Call" : "Outbound Call"}
        </div>
        <div className="text-sm text-gray-500">
          Duration: {formatDuration(duration)}
        </div>
        <div
          className={`inline-block px-3 py-1 rounded-full text-sm mt-2 ${
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

      {/* Call Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={toggleMute}
          className={`p-3 rounded-full ${
            isMuted ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
          } hover:bg-opacity-80 transition-colors`}
        >
          <MicrophoneIcon className="h-6 w-6" />
        </button>

        <button
          onClick={toggleHold}
          className={`p-3 rounded-full ${
            isOnHold
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-100 text-gray-600"
          } hover:bg-opacity-80 transition-colors`}
        >
          {isOnHold ? (
            <PlayIcon className="h-6 w-6" />
          ) : (
            <PauseIcon className="h-6 w-6" />
          )}
        </button>

        <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-opacity-80 transition-colors">
          <SpeakerWaveIcon className="h-6 w-6" />
        </button>

        <button
          onClick={handleEndCall}
          disabled={endCallMutation.isPending}
          className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          <PhoneXMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Call Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Call Notes
        </label>
        <textarea
          rows={3}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add notes about this call..."
          onChange={(e) => {
            updateCallMutation.mutate({ notes: e.target.value });
          }}
        />
      </div>

      {/* Customer Info */}
      {call.callerInfo && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Customer Information
          </h4>
          <div className="space-y-1 text-sm text-gray-600">
            {call.callerInfo.name && <div>Name: {call.callerInfo.name}</div>}
            {call.callerInfo.customerId && (
              <div>Customer ID: {call.callerInfo.customerId}</div>
            )}
            {call.callerInfo.accountType && (
              <div>Account Type: {call.callerInfo.accountType}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CallInterface;
