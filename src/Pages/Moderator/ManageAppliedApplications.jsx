import React, { useEffect, useState } from "react";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  // Fetch all applications
  useEffect(() => {
    axiosSecure
      .get("/applications") 
      .then(res => setApplications(res.data))
      .catch(err => console.log(err));
  }, [axiosSecure]);

  // View Details
  const handleDetails = (app) => {
    setSelectedApp(app);
    Swal.fire({
      title: "Application Details",
      html: `
        <b>Applicant Name:</b> ${app.userName}<br/>
        <b>Applicant Email:</b> ${app.userEmail}<br/>
        <b>University:</b> ${app.universityName}<br/>
        <b>Degree:</b> ${app.degree}<br/>
        <b>Application Fees:</b> $${app.applicationFees}<br/>
        <b>Status:</b> ${app.applicationStatus}<br/>
        <b>Payment:</b> ${app.paymentStatus}<br/>
        <b>Feedback:</b> ${app.feedback || "No feedback yet"}
      `
    });
  };

  // Write Feedback
  const handleFeedback = (app) => {
    Swal.fire({
      title: "Write Feedback",
      input: "textarea",
      inputValue: app.feedback || "",
      showCancelButton: true,
      confirmButtonText: "Submit",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const feedback = result.value;
        try {
          await axiosSecure.patch(`/applications/feedback/${app._id}`, { feedback });
          setApplications(prev =>
            prev.map(item => item._id === app._id ? { ...item, feedback } : item)
          );
          Swal.fire("Saved!", "Feedback updated.", "success");
        } catch (err) {
          console.log(err);
          Swal.fire("Error", "Could not update feedback.", "error");
        }
      }
    });
  };

  // Update Status
  const handleStatusUpdate = async (app, status) => {
    try {
      await axiosSecure.patch(`/applications/status/${app._id}`, { status });
      setApplications(prev =>
        prev.map(item => item._id === app._id ? { ...item, applicationStatus: status } : item)
      );
      Swal.fire("Updated!", `Status changed to ${status}`, "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Could not update status.", "error");
    }
  };

  // Reject / Cancel
  const handleReject = async (app) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This application will be rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleStatusUpdate(app, "rejected");
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant Name</th>
              <th>Applicant Email</th>
              <th>University Name</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <th>{index + 1}</th>
                <td>{app.userName}</td>
                <td>{app.userEmail}</td>
                <td>{app.universityName}</td>
                <td>{app.feedback || "No feedback yet"}</td>
                <td>
                  <span className={`badge 
                    ${app.applicationStatus === "pending" && "badge-warning"}
                    ${app.applicationStatus === "processing" && "badge-info"}
                    ${app.applicationStatus === "completed" && "badge-success"}
                    ${app.applicationStatus === "rejected" && "badge-error"}
                  `}>{app.applicationStatus}</span>
                </td>
                <td>{app.paymentStatus}</td>
                <td className="flex flex-wrap gap-2">
                  <button className="btn btn-xs btn-info" onClick={() => handleDetails(app)}>Details</button>
                  <button className="btn btn-xs btn-primary" onClick={() => handleFeedback(app)}>Feedback</button>
                  <button className="btn btn-xs btn-success" onClick={() => handleStatusUpdate(app, "processing")}>Processing</button>
                  <button className="btn btn-xs btn-success" onClick={() => handleStatusUpdate(app, "completed")}>Completed</button>
                  <button className="btn btn-xs btn-error" onClick={() => handleReject(app)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageApplications;
