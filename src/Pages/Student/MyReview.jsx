import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Fetch all reviews 
  useEffect(() => {
    if (!user) return;

    axiosSecure
      .get(`/reviews/user/${user.email}`)
      .then(res => setReviews(res.data))
      .catch(err => console.log(err));
  }, [axiosSecure, user]);

  // Delete review
  const handleDelete = async (reviewId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/reviews/${reviewId}`);
        setReviews(prev => prev.filter(r => r._id !== reviewId));
        Swal.fire("Deleted!", "Review deleted.", "success");
      } catch (err) {
        console.log(err);
        Swal.fire("Error", "Could not delete review", "error");
      }
    }
  };

  // Open Edit Modal
  const handleEdit = (review) => {
    setSelectedReview(review);
    setRating(review.ratingPoint);
    setComment(review.reviewComment);
    setShowModal(true);
  };

  // Submit Edited Review
  const handleSubmit = async () => {
    if (!rating || !comment) {
      Swal.fire("Error", "Please provide rating and comment", "error");
      return;
    }

    try {
      const res = await axiosSecure.patch(`/reviews/${selectedReview._id}`, {
        ratingPoint: rating,
        reviewComment: comment,
      });

      if (res.data.success) {
        setReviews(prev =>
          prev.map(r =>
            r._id === selectedReview._id
              ? { ...r, ratingPoint: rating, reviewComment: comment }
              : r
          )
        );
        setShowModal(false);
        Swal.fire("Success", "Review updated", "success");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Could not update review", "error");
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Scholarship Name</th>
            <th>University Name</th>
            <th>Comment</th>
            <th>Rating</th>
            <th>Review Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r, idx) => (
            <tr key={r._id}>
              <th>{idx + 1}</th>
              <td>{r?.scholarshipName}</td>
              <td>{r.universityName}</td>
              <td>{r.reviewComment}</td>
              <td>{r.ratingPoint} ⭐</td>
              <td>{new Date(r.reviewDate).toLocaleDateString()}</td>
              <td className="flex gap-2">
                <button
                  className="btn btn-xs btn-warning"
                  onClick={() => handleEdit(r)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => handleDelete(r._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-96 max-w-full">
            <h3 className="text-xl font-bold mb-4 text-center">
              Edit Review
            </h3>

            <div className="mb-4">
              <label className="block font-medium mb-2">Rating</label>
              <div className="flex items-center space-x-2">
                {[1,2,3,4,5].map(star => (
                  <span
                    key={star}
                    className={`cursor-pointer text-2xl ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="textarea textarea-bordered w-full rounded-lg border-gray-300"
                rows={4}
              />
            </div>

            <button
              className="btn btn-primary w-full mb-2"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              className="btn btn-outline w-full"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
