import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        // Update payment status
        await axiosSecure.patch(`/applications/payment/${id}`);

        // Fetch application details
        const res = await axiosSecure.get(`/applications/${id}`);
        setApplication(res.data);
      } catch (error) {
        console.error("Payment update failed:", error);
      } finally {
        setLoading(false);
      }
    };

    handlePaymentSuccess();
  }, [id, axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-base-100 p-8 rounded-xl shadow-xl text-center max-w-md">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h2 className="text-2xl font-bold mb-2">Payment Successful 🎉</h2>

        <div className="text-left mt-4 space-y-2">
          <p>
            <span className="font-semibold">University:</span>{" "}
            {application.universityName}
          </p>
          <p>
            <span className="font-semibold">Category:</span>{" "}
            {application.scholarshipCategory}
          </p>
          <p>
            <span className="font-semibold">Paid Amount:</span>{" "}
            ${application.applicationFees}
          </p>
        </div>

        <p className="text-gray-600 mt-4">
          Your scholarship application payment was successful.
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Application ID: <span className="font-semibold">{id}</span>
        </p>

        <Link
          to="/dashboard/my-applications"
          className="btn btn-primary w-full mt-6"
        >
          Go to My Applications
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
