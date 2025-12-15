import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Fetch my applications
  useEffect(() => {
    if (!user) return;
    axiosSecure
      .get("/applications/my")
      .then((res) => setApplications(res.data))
      .catch((err) => console.log(err));
  }, [axiosSecure, user]);

  // Delete Application (pending only)
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This application will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/applications/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setApplications((prev) => prev.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "Application deleted.", "success");
          }
        });
      }
    });
  };

  // Payment
  const handlePay = async (app) => {
    try {
      const res = await axiosSecure.post("/create-payment-checkout", {
        applicationId: app._id,
        scholarshipId: app.scholarshipId,
        userEmail: app.userEmail,
        totalAmount: app.applicationFees + app.serviceCharge,
      });
      window.location.replace(res.data.url);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Payment failed", "error");
    }
  };

  // Submit Review
  const handleSubmitReview = async () => {
    if (!rating || !comment) {
      Swal.fire("Error", "Please provide rating and comment", "error");
      return;
    }

    try {
      const reviewData = {
        scholarshipId: selectedApp.scholarshipId,
        universityName: selectedApp.universityName,
        userName: user.displayName || user.email,
        userEmail: user.email,
        userImage: user.photoURL || "",
        ratingPoint: rating,
        reviewComment: comment,
      };

      await axiosSecure.post("/reviews", reviewData);

      setShowReview(false);
      setRating(0);
      setComment("");
      Swal.fire("Success", "Review added successfully", "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Could not submit review", "error");
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>University</th>
            <th>Address</th>
            <th>Category</th>
            <th>Fees</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={app._id}>
              <th>{index + 1}</th>
              <td className="font-semibold">{app.universityName}</td>
              <td>{app.universityAddress || "—"}</td>
              <td>{app.scholarshipCategory}</td>
              <td>${app.applicationFees}</td>
              <td>
                <span
                  className={`badge 
                    ${app.applicationStatus === "pending" && "badge-warning"}
                    ${app.applicationStatus === "processing" && "badge-info"}
                    ${app.applicationStatus === "completed" && "badge-success"}
                    ${app.applicationStatus === "rejected" && "badge-error"}
                  `}
                >
                  {app.applicationStatus}
                </span>
              </td>
              <td>{"—"}</td> {/* Placeholder, review fetch optional */}
              <td className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedApp(app);
                    setShowDetails(true);
                  }}
                  className="btn btn-xs btn-info"
                >
                  Details
                </button>

                {app.applicationStatus === "pending" && (
                  <>
                    <button className="btn btn-xs btn-warning">Edit</button>
                    {app.paymentStatus === "unpaid" && (
                      <button
                        onClick={() => handlePay(app)}
                        className="btn btn-xs btn-success"
                      >
                        Pay
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </>
                )}

                {app.applicationStatus === "completed" && (
                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      setShowReview(true);
                    }}
                    className="btn btn-xs btn-primary"
                  >
                    Add Review
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Details Modal */}
      {showDetails && selectedApp && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-2">Application Details</h3>
            <p>
              <strong>University:</strong> {selectedApp.universityName}
            </p>
            <p>
              <strong>Address:</strong> {selectedApp.universityAddress}
            </p>
            <p>
              <strong>Degree:</strong> {selectedApp.degree}
            </p>
            <p>
              <strong>Category:</strong> {selectedApp.scholarshipCategory}
            </p>
            <p>
              <strong>Application Fees:</strong> ${selectedApp.applicationFees}
            </p>
            <p>
              <strong>Service Charge:</strong> ${selectedApp.serviceCharge}
            </p>
            <p>
              <strong>Status:</strong> {selectedApp.applicationStatus}
            </p>
            <p>
              <strong>Payment Status:</strong> {selectedApp.paymentStatus}
            </p>
            <p>
              <strong>Feedback:</strong> {"—"}
            </p>
            <button
              onClick={() => setShowDetails(false)}
              className="btn btn-sm btn-primary mt-4 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReview && selectedApp && (
        <div className="fixed inset-0 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 max-w-full animate-fadeIn">
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Add Review
            </h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Rating</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer text-2xl ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    } transition-transform hover:scale-110`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="textarea textarea-bordered w-full rounded-lg border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:outline-none transition"
                rows={4}
                placeholder="Write your comment..."
              />
            </div>

            <button
              onClick={handleSubmitReview}
              className="btn btn-primary w-full mb-2 hover:scale-105 transition-transform"
            >
              Submit
            </button>
            <button
              onClick={() => setShowReview(false)}
              className="btn btn-outline w-full hover:scale-105 transition-transform"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
