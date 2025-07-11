// ================================
// COMPONENTS/QUEUES/CREATEQUEUEMODAL.JS - Create Queue Modal
// ================================
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queuesAPI } from "../../services/api";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CreateQueueModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const createQueueMutation = useMutation({
    mutationFn: queuesAPI.createQueue,
    onSuccess: () => {
      toast.success("Queue created successfully");
      queryClient.invalidateQueries(["queues"]);
      reset();
      onClose();
    },
    onError: (error) => {
      toast.error(error.error?.message || "Failed to create queue");
    },
  });

  const onSubmit = (data) => {
    const queueData = {
      name: data.name,
      description: data.description,
      strategy: data.strategy,
      configuration: {
        maxWaitTime: parseInt(data.maxWaitTime) || 300,
        maxQueueSize: parseInt(data.maxQueueSize) || 100,
        skillsRequired: data.skillsRequired
          ? data.skillsRequired.split(",").map((s) => s.trim())
          : [],
      },
    };
    createQueueMutation.mutate(queueData);
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
                Create New Queue
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
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Queue Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Queue name is required" })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white hover:border-gray-400 transition-all duration-200"
                  placeholder="Customer Support"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white hover:border-gray-400 transition-all duration-200 resize-none"
                  placeholder="Queue description..."
                />
              </div>

              <div>
                <label
                  htmlFor="strategy"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Routing Strategy
                </label>
                <select
                  {...register("strategy", {
                    required: "Strategy is required",
                  })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white hover:border-gray-400 transition-all duration-200"
                >
                  <option value="">Select Strategy</option>
                  <option value="round_robin">Round Robin</option>
                  <option value="skills_based">Skills Based</option>
                  <option value="weighted">Weighted</option>
                  <option value="priority">Priority</option>
                </select>
                {errors.strategy && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.strategy.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="maxWaitTime"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Max Wait Time (seconds)
                  </label>
                  <input
                    type="number"
                    {...register("maxWaitTime")}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white hover:border-gray-400 transition-all duration-200"
                    placeholder="300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="maxQueueSize"
                    className="block text-sm font-semibold text-gray-800 mb-2"
                  >
                    Max Queue Size
                  </label>
                  <input
                    type="number"
                    {...register("maxQueueSize")}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white hover:border-gray-400 transition-all duration-200"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="skillsRequired"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Required Skills (comma-separated)
                </label>
                <input
                  type="text"
                  {...register("skillsRequired")}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white hover:border-gray-400 transition-all duration-200"
                  placeholder="customer_service, technical_support"
                />
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
                  disabled={createQueueMutation.isPending}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {createQueueMutation.isPending
                    ? "Creating..."
                    : "Create Queue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQueueModal;
