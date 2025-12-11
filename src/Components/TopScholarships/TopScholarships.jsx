import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import HookAxios from "../../Hooks/HookAxios";


const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const axiosInstance = HookAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axiosInstance.get("/scholarships"); 
        const sorted = res.data
          .sort((a, b) => a.applicationFees - b.applicationFees || new Date(b.postDate) - new Date(a.postDate))
          .slice(0, 6); // top 6 scholarships
        setScholarships(sorted);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchScholarships();
  }, [axiosInstance]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
          Top Scholarships
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {scholarships.map((scholarship, index) => (
            <motion.div
              key={scholarship._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={scholarship.image}
                alt={scholarship.universityName}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {scholarship.universityName}
                </h3>
                <p className="text-gray-500 mt-1">{scholarship.scholarshipCategory}</p>
                <p className="text-gray-600 mt-2">
                  {scholarship.city}, {scholarship.country}
                </p>
                <p className="text-gray-700 mt-2 font-semibold">
                  {scholarship.applicationFees > 0
                    ? `$${scholarship.applicationFees} Application Fee`
                    : "No Application Fee"}
                </p>

                <button
                  onClick={() => navigate(`/scholarship-details/${scholarship._id}`, { state: scholarship })}
                  className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopScholarships;
