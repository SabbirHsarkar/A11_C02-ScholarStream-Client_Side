import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const MyProfile = () => {
  const { user, role } = useContext(AuthContext);
   const { logOut } = useContext(AuthContext);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9f3ff] to-[#f7fbff] flex justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-blue-100">

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          My Profile
        </h1>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          
          {/* Profile Image */}
          <img
            src={
              user?.photoURL ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-md"
          />

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.displayName || "Unknown User"}
            </h2>

            <p className="mt-1 text-gray-600">
              <span className="font-medium">Email:</span> {user?.email}
            </p>

            <p className="mt-1 text-gray-600">
              <span className="font-medium">Role:</span>{" "}
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                {role}
              </span>
            </p>

            <p className="mt-1 text-gray-600">
              <span className="font-medium">Account Created:</span>{" "}
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Additional Details Section */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100">
            <h3 className="text-lg font-bold text-blue-700 mb-3">
              Account Info
            </h3>
            <p className="text-gray-700">
              <span className="font-semibold">Verified:</span>{" "}
              {user?.email? "Yes" : "No"}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Last Login:</span>{" "}
              {user?.metadata?.lastSignInTime
                ? new Date(user.metadata.lastSignInTime).toLocaleString()
                : "N/A"}
            </p>
          </div>

          <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100">
            <h3 className="text-lg font-bold text-blue-700 mb-3">
              Dashboard Status
            </h3>
            <p className="text-gray-700">
              You are logged in as{" "}
              <span className="font-semibold text-blue-700">{role}</span>.
            </p>
            <p className="text-gray-700 mt-2">
              You can manage scholarships, update your profile, and more.
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center mt-10">
         <button
                onClick={logOut}
                className="text-red-500 font-semibold mt-3 hover:bg-red-50 rounded-md px-3 py-2"
              >
                Logout
              </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
