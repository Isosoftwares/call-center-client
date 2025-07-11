// ================================
// PAGES/PHONENUMBERS.JS - Phone Numbers Management
// ================================
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { phoneNumbersAPI } from "../services/api";
import { PlusIcon } from "@heroicons/react/24/outline";
import PhoneNumberFilters from "./components/PhoneNumberFilters";
import PhoneNumbersList from "./components/PhoneNumbersList";
import PurchaseNumberModal from "./components/PurchaseNumberModal";

const PhoneNumbers = () => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [filters, setFilters] = useState({
    isActive: "",
    purpose: "",
  });

  const { data: phoneNumbers, isLoading } = useQuery({
    queryKey: ["phone-numbers", filters],
    queryFn: () => phoneNumbersAPI.getPhoneNumbers(filters),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Phone Numbers</h1>
        <button
          onClick={() => setShowPurchaseModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Purchase Number</span>
        </button>
      </div>

      <PhoneNumberFilters filters={filters} onFiltersChange={setFilters} />

      <PhoneNumbersList
        phoneNumbers={phoneNumbers?.data || []}
        isLoading={isLoading}
      />

      {showPurchaseModal && (
        <PurchaseNumberModal
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
        />
      )}
    </div>
  );
};

export default PhoneNumbers;
