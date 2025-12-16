import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center"
      >
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed
        </h2>

        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be completed.
          <br />
          Please try again or check your payment details.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Go to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
