import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useNavigate } from "react-router";

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        setUser({ ...auth.currentUser }); // update context
        navigate("/profile"); // redirect back
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-lg p-8  rounded-3xl border">

        <h2 className="text-2xl font-bold text-center mb-6">
          Update Your Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4 mt-4">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                defaultValue={user?.displayName}
                name="name"
                type="text"
                className="input input-bordered w-full text-black"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">PhotoURL</span>
              </label>
              <input
                defaultValue={user?.photoURL}
                name="photoURL"
                type="text"
                className="input input-bordered w-full text-black"
                placeholder="Enter photoURL"
              />
            </div>

            <button className="btn btn-neutral w-full mt-2">Update</button>
          </form>

      </div>
    </div>
  );
};

export default UpdateProfile;
