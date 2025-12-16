import React, { useEffect, useState } from "react";
import HookAxios from "../Hooks/HookAxios";
import { useNavigate } from "react-router";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);

  //  filter & sort states
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  
  const [sort, setSort] = useState("");

  const axiosInstance = HookAxios();
  
  const navigate = useNavigate();

  //  Fetch scholarships SERVER SIDE
  useEffect(() => {
    axiosInstance
      .get("/scholarships", {
        params: {
          search,
          country,
         
          sort,
        },
      })
      .then((res) => {
        setScholarships(res.data);
      })
      .catch((err) => {
        console.log("Error fetching scholarships:", err);
      });
  }, [axiosInstance, search, country, sort]);

  const handleViewDetails = (scholarship) => {
    navigate(`/scholarship/${scholarship._id}`, {
      state: scholarship,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        All Scholarships
      </h1>

      {/*  SEARCH + FILTER + SORT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by scholarship / university / degree"
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Country Filter */}
        <select
          className="select select-bordered w-full"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">All Countries</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </select>

        {/* Category Filter */}
      

        {/* Sort */}
        <select
          className="select select-bordered w-full"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Default Sort</option>
          <option value="fee_asc">Fee: Low to High</option>
          <option value="fee_desc">Fee: High to Low</option>
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
        </select>
      </div>

      {/*  SCHOLARSHIP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {scholarships.length > 0 ? (
          scholarships.map((item) => (
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
                <h2 className="font-bold text-lg">
                  {item.scholarshipName || item.universityName}
                </h2>

                <p className="text-sm text-gray-600">
                  {item.scholarshipCategory}
                </p>

                <p className="text-sm text-gray-500">
                  {item.city}, {item.country}
                </p>

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
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No scholarships found
          </p>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
