import React, { useEffect, useState } from "react";
import HookAxios from "../Hooks/HookAxios";
import { useNavigate } from "react-router";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const axiosInstance = HookAxios();
  const navigate = useNavigate();

  useEffect(() => {
    
axiosInstance.get("/scholarships") 
      .then((res) => {
        setScholarships(res.data);
      })
      .catch((err) => {
        console.log("Error fetching scholarships:", err);
      });
  }, [axiosInstance]);

  const handleViewDetails = (scholarship) => {
    navigate(`/scholarship-details/${scholarship._id}`, 
        { state: scholarship });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        All Scholarships
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {scholarships.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
          >
            <img
              src={item.image}
              alt={item.universityName}
              className="h-40 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="font-bold text-lg">{item.universityName}</h2>
              <p className="text-sm text-gray-600">{item.scholarshipCategory}</p>
              <p className="text-sm text-gray-500">{item.city}, {item.country}</p>
              <p className="text-sm font-semibold">
                Application Fees: ${item.applicationFees || 0}
              </p>
              <button
                onClick={() => handleViewDetails(item)}
                className="mt-3 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllScholarships;
