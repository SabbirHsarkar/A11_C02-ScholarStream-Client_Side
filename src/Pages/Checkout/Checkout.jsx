import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Checkout = () => {
  const { id } = useParams(); // scholarshipId
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/scholarships/${id}`).then(res => {
      setScholarship(res.data);
      setLoading(false);
    });
  }, [axiosSecure, id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const applicationFees = scholarship.applicationFees || 0;
  const serviceCharge = scholarship.serviceCharge || 0;
  const totalAmount = applicationFees + serviceCharge;

  // 🔥 Stripe Payment
  const handlePayment = async () => {
    try {
      // 1️⃣ create application (unpaid)
      const appRes = await axiosSecure.post("/applications", {
        scholarshipId: scholarship._id,
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        
scholarshipName:scholarship.scholarshipName,
        universityName: scholarship.universityName,
        scholarshipCategory: scholarship.scholarshipCategory,
        degree: scholarship.degree,
        applicationFees,
        serviceCharge,
      });

      const applicationId = appRes.data.insertedId;

      // 2️⃣ create stripe checkout
      const paymentRes = await axiosSecure.post(
        "/create-payment-checkout",
        {
          applicationId,
          totalAmount,
          userEmail: user.email,
        }
      );

      // 3️⃣ redirect to Stripe
      window.location.replace(paymentRes.data.url);

    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-base-100 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          {scholarship.scholarshipName}
        </h3>
        <p className="text-gray-600">{scholarship.universityName}</p>
      </div>

      <div className="border rounded p-4 mb-6">
        <div className="flex justify-between">
          <span>Application Fee</span>
          <span>${applicationFees}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Charge</span>
          <span>${serviceCharge}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${totalAmount}</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="btn btn-primary w-full"
      >
        Pay & Apply
      </button>
    </div>
  );
};

export default Checkout;
