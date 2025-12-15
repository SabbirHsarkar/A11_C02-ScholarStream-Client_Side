import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);

  // Fetch my applications
  useEffect(() => {
    if (!user) return;

    axiosSecure
      .get("/applications/my")
      .then(res => {
        setApplications(res.data);
      })
      .catch(err => console.log(err));
  }, [axiosSecure, user]);

  // Delete Application (only pending)
  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "This application will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/applications/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            setApplications(prev =>
              prev.filter(item => item._id !== id)
            );
            Swal.fire("Deleted!", "Application deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>University</th>
            <th>Degree</th>
            <th>Fees</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app, index) => (
            <tr key={app?._id}>
              <th>{index + 1}</th>
              <td className="font-semibold">{app.universityName}</td>
              <td>{app?.degree}</td>
              <td>${app.applicationFees}</td>

              <td>
                <span className={`badge 
                  ${app.applicationStatus === "pending" && "badge-warning"}
                  ${app.applicationStatus === "processing" && "badge-info"}
                  ${app.applicationStatus === "completed" && "badge-success"}
                  ${app.applicationStatus === "rejected" && "badge-error"}
                `}>
                  {app.applicationStatus}
                </span>
              </td>

              <td>{app?.feedback}</td>

              <td className="flex gap-2">
                {/* Pay Button */}
                {app.applicationStatus === "pending" &&
                  app.paymentStatus === "unpaid" && (
                    <button className="btn btn-xs btn-success">
                      Pay
                    </button>
                  )}

                {/* Delete Button */}
                {app.applicationStatus === "pending" && (
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                )}

                {/* Review Button */}
                {app.applicationStatus === "completed" && (
                  <button className="btn btn-xs btn-primary">
                    Add Review
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplications;
