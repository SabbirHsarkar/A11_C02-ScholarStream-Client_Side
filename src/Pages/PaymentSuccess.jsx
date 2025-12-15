import React, { useEffect } from "react";
import { useParams, Link } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";


const PaymentSuccess = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        await axiosSecure.patch(`/applications/payment/${id}`);
      } catch (error) {
        console.error("Payment update failed:", error);
      }
    };

    updatePaymentStatus();
  }, [id, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-base-100 p-8 rounded-xl shadow-xl text-center max-w-md">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Payment Successful 🎉</h2>
        <p className="text-gray-600 mb-4">
          Your scholarship application has been submitted successfully.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Application ID: <span className="font-semibold">{id}</span>
        </p>
        <Link to="/dashboard/my-applications" className="btn btn-primary w-full">
          Go to My Applications
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
