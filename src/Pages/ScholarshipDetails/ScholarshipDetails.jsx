import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import HookAxios from "../../Hooks/HookAxios";


const ScholarshipDetails = () => {
  const { id } = useParams();
  const axiosInstance = HookAxios();

  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch Scholarship Details
    axiosInstance.get(`/scholarships/${id}`).then((res) => {
      setScholarship(res.data);
    });

    // Fetch Reviews
    axiosInstance.get(`/reviews/${id}`).then((res) => {
      setReviews(res.data);
    });
  }, [id, axiosInstance]);

  if (!scholarship) {
    return (
      <div className="text-center text-white py-32 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="bg-[#0B0D17] text-white min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Image + Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-10"
        >
          {/* Image */}
          <img
            src={scholarship.image}
            alt={scholarship.scholarshipName}
            className="rounded-2xl shadow-2xl w-full object-cover"
          />

          {/* Main Info */}
          <div>
            <h1 className="text-4xl font-extrabold text-pink-400 mb-4">
              {scholarship.scholarshipName}
            </h1>

            <p className="text-xl text-gray-300 mb-2">
              <span className="font-semibold text-purple-400">University:</span> {scholarship.universityName}
            </p>

            <p className="text-xl text-gray-300 mb-2">
              <span className="font-semibold text-purple-400">World Rank:</span> {scholarship.universityRank}
            </p>

            <p className="text-xl text-gray-300 mb-2">
              <span className="font-semibold text-purple-400">Deadline:</span> {scholarship.deadline}
            </p>

            <p className="text-xl text-gray-300 mb-2">
              <span className="font-semibold text-purple-400">Location:</span> {scholarship.location}
            </p>

            <p className="text-xl text-gray-300 mb-4">
              <span className="font-semibold text-purple-400">Application Fees:</span> 
              {scholarship.applicationFee > 0 ? `$${scholarship.applicationFee}` : "Free"}
            </p>

            <Link to={`/dashboard/checkout/${id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 
                rounded-xl font-bold shadow-lg hover:shadow-2xl"
              >
                Apply for Scholarship
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 bg-[#1A1F3B] p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4 text-pink-300">Description</h2>
          <p className="text-gray-300 leading-relaxed">{scholarship.description}</p>
        </motion.div>

        {/* Stipend / Coverage */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 bg-[#1A1F3B] p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-300">Stipend & Coverage</h2>
          <p className="text-gray-300 leading-relaxed">{scholarship.coverage}</p>
        </motion.div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-indigo-300">Student Reviews</h2>

          {reviews.length === 0 ? (
            <p className="text-gray-400">No reviews yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {reviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="bg-[#242A40] p-6 rounded-xl shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.reviewerImage}
                      alt="Reviewer"
                      className="w-12 h-12 rounded-full ring-2 ring-purple-500"
                    />
                    <div>
                      <h3 className="font-semibold">{review.reviewerName}</h3>
                      <p className="text-gray-400 text-sm">{review.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-300">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipDetails;
