// ================================
// COMPONENTS/CALLS/MAKECALLMODAL.JS - Make Call Modal
// ================================
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { callsAPI } from "../../services/api";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/outline";

const MakeCallModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const makeCallMutation = useMutation({
    mutationFn: callsAPI.createCall,
    onSuccess: () => {
      toast.success("Call initiated successfully");
      queryClient.invalidateQueries(["active-calls"]);
      reset();
      onClose();
    },
    onError: (error) => {
      toast.error(error.error?.message || "Failed to make call");
    },
  });

  const onSubmit = (data) => {
    makeCallMutation.mutate({
      phoneNumber: data.phoneNumber,
      customerId: data.customerId,
      priority: parseInt(data.priority) || 0,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-200">
          <div className="bg-white px-6 pt-6 pb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Make New Call
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+[1-9]\d{1,14}$/,
                      message:
                        "Enter a valid international phone number (e.g., +1234567890)",
                    },
                  })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white hover:border-gray-400 transition-all duration-200"
                  placeholder="+1234567890"
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="customerId"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Customer ID (Optional)
                </label>
                <input
                  type="text"
                  {...register("customerId")}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white hover:border-gray-400 transition-all duration-200"
                  placeholder="CUST123"
                />
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Priority
                </label>
                <select
                  {...register("priority")}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white hover:border-gray-400 transition-all duration-200"
                >
                  <option value="0">Low</option>
                  <option value="5">Normal</option>
                  <option value="8">High</option>
                  <option value="10">Urgent</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={makeCallMutation.isPending}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {makeCallMutation.isPending ? "Calling..." : "Make Call"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeCallModal;
