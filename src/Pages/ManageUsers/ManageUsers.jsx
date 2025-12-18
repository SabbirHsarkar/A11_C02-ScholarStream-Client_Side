import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");

  // Fetch users
  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure, user]);

  // Filter users by role
  const filteredUsers =
    filterRole === "all"
      ? users
      : users.filter((u) => u.role === filterRole);

  // Change user role
  const handleChangeRole = (id, newRole) => {
    axiosSecure
      .patch(`/users/role/${id}`, { role: newRole })
      .then(() => {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id ? { ...u, role: newRole } : u
          )
        );
      });
  };

  // Delete user
     
//   const handleDelete = (id) => {
//   axiosSecure.delete(`/users/${id}`)   
//     .then((res) => {
//       console.log(res.data);
//       if (res.data.deletedCount > 0) {
//         setUsers((prev) => prev.filter((u) => u._id !== id));
//         alert("User deleted successfully!");
//       }
//     })
//     .catch((err) => console.log(err));
// };

const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This user will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.delete(`/users/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            setUsers((prev) =>
              prev.filter((u) => u._id !== id)
            );

            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted successfully.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete user.",
            icon: "error",
          });
        });
    }
  });
};


  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-indigo-600">
          Manage Users
        </h2>

       
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="mt-3 md:mt-0 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Users</option>
          <option value="student">Student</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

  
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr
                key={u._id}
                className="border-t hover:bg-gray-50 transition "
              >
                <td className="px-4 py-3 font-medium">
                  {u.name || "N/A"}
                </td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3 capitalize">{u.role}</td>

                <td className="px-4 py-3 text-center space-x-2 ">
                  {/* Promote / Demote */}
                  {u.role !== "admin" && (
                    <button
                      onClick={() =>
                        handleChangeRole(
                          u._id,
                          u.role === "student" ? "moderator" : "admin"
                        )
                      }
                      className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg"
                    >
                      Promote
                    </button>
                  )}

                  {u.role !== "student" && (
                    <button
                      onClick={() =>
                        handleChangeRole(u._id, "student")
                      }
                      className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                    >
                      Demote
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
