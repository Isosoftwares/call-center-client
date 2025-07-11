// ================================
// COMPONENTS/PHONENUMBERS/PURCHASENUMBERMODAL.JS - Purchase Number Modal
// ================================
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { phoneNumbersAPI } from "../../services/api";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/outline";

const PurchaseNumberModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const purchaseMutation = useMutation({
    mutationFn: phoneNumbersAPI.purchaseNumber,
    onSuccess: () => {
      toast.success("Phone number purchased successfully");
      queryClient.invalidateQueries(["phone-numbers"]);
      reset();
      onClose();
    },
    onError: (error) => {
      toast.error(error.error?.message || "Failed to purchase number");
    },
  });

  const onSubmit = (data) => {
    purchaseMutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Purchase Phone Number
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="areaCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Area Code
                </label>
                <input
                  type="text"
                  {...register("areaCode", {
                    required: "Area code is required",
                    pattern: {
                      value: /^\d{3}$/,
                      message: "Area code must be 3 digits",
                    },
                  })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="415"
                  maxLength={3}
                />
                {errors.areaCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.areaCode.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="friendlyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Friendly Name
                </label>
                <input
                  type="text"
                  {...register("friendlyName")}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Customer Support Line"
                />
              </div>

              <div>
                <label
                  htmlFor="purpose"
                  className="block text-sm font-medium text-gray-700"
                >
                  Purpose
                </label>
                <select
                  {...register("purpose", { required: "Purpose is required" })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Purpose</option>
                  <option value="customer_support">Customer Support</option>
                  <option value="sales">Sales</option>
                  <option value="technical_support">Technical Support</option>
                  <option value="billing">Billing</option>
                  <option value="main">Main Line</option>
                </select>
                {errors.purpose && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.purpose.message}
                  </p>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="text-sm text-yellow-700">
                  <strong>Note:</strong> Phone numbers typically cost
                  $1.15/month plus usage fees. You will be charged immediately
                  upon purchase.
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={purchaseMutation.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {purchaseMutation.isPending
                    ? "Purchasing..."
                    : "Purchase Number"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseNumberModal;
