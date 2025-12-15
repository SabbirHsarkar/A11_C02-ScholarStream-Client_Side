import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const AllReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  // Fetch all reviews (moderator only)
  useEffect(() => {
    if (!user) return;

    axiosSecure
      .get("/reviews")
      .then(res => setReviews(res.data))
      .catch(err => console.log(err));
  }, [axiosSecure, user]);

  // Delete review (moderator only)
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

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Reviews</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Scholarship Name</th>
            <th>University Name</th>
            <th>Student Name</th>
            <th>Comment</th>
            <th>Rating</th>
            <th>Review Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r, idx) => (
            <tr key={r._id}>
              <th>{idx + 1}</th>
              <td>{r.scholarshipName || "—"}</td>
              <td>{r.universityName}</td>
              <td>{r.userName}</td>
              <td>{r.reviewComment}</td>
              <td>{r.ratingPoint} ⭐</td>
              <td>{new Date(r.reviewDate).toLocaleDateString()}</td>
              <td>
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
    </div>
  );
};

export default AllReviews;
