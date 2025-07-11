// ================================
// COMPONENTS/PHONENUMBERS/PHONENUMBERSLIST.JS - Phone Numbers List
// ================================
import React from "react";
import PhoneNumberCard from "./PhoneNumberCard";

const PhoneNumbersList = ({ phoneNumbers, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (phoneNumbers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">No phone numbers found</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {phoneNumbers.map((phoneNumber) => (
        <PhoneNumberCard key={phoneNumber._id} phoneNumber={phoneNumber} />
      ))}
    </div>
  );
};

export default PhoneNumbersList;