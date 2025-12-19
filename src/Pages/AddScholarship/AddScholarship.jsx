import { useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";

import {useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddScholarship = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  // const axiosInstance=HookAxios();
  const axiosSecure=useAxiosSecure();

  const handleAddScholarship = async (e) => {
  e.preventDefault();
  setLoading(true);

  const form = e.target;
  const file = form.image.files[0]; 

  
   
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=c220f6de682af6f4d4e97f37e4f3a4a2`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const imageURL = res.data.data.display_url; 

    
    const scholarshipData = {
      scholarshipName: form.scholarshipName.value,
      universityName: form.universityName.value,
      image: imageURL, 
      country: form.country.value,
      city: form.city.value,
      worldRank: parseInt (form.worldRank.value),
      subjectCategory: form.subjectCategory.value,
      scholarshipCategory: form.scholarshipCategory.value,
      degree: form.degree.value,
      tuitionFees:parseInt(form.tuitionFees.value) ,
      applicationFees: parseInt (form.applicationFees.value),
      serviceCharge: parseInt (form.serviceCharge.value),
      deadline: form.deadline.value,
      postDate: form.postDate.value,
      userEmail: user?.email,
    };

   
    // axios.post( "https://scholarstream-beryl.vercel.app/scholarships",scholarshipData )
    axiosSecure.post("/scholarships",scholarshipData)
    .then(res=>{
      console.log(res.data);
      if (res.data.insertedId) {
      
      navigate("/dashboard/manage-scholarship");
    }
      
    })
    .catch(err=>console.log(err));
 
    setLoading(false);
  
};


  return (
    <div className="max-w-4xl mx-auto mt-1 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
        Add New Scholarship
      </h2>

      <form onSubmit={handleAddScholarship} className="space-y-6">
        {/* Scholarship Name */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">
            Scholarship Name
          </label>
          <input
            type="text"
            name="scholarshipName"
            required
            placeholder="Enter scholarship name"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* University */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">
            University Name
          </label>
          <input
            type="text"
            name="universityName"
            required
            placeholder="Enter university name"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">Scholarship Image</label>
          <input
            type="file"
            name="image"
            required
            accept="image/*"
            className="file-input file-input-bordered w-full rounded-lg"
          />
        </div>

        {/* Country & City */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Country</label>
            <input
              type="text"
              name="country"
              required
              placeholder="Country"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              required
              placeholder="City"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* World Rank */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">World Rank</label>
          <input
            type="number"
            name="worldRank"
            required
            placeholder="Enter world ranking"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Subject & Scholarship Category */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Subject Category</label>
            <input
              type="text"
              name="subjectCategory"
              required
              placeholder="e.g., Engineering"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Scholarship Category</label>
            <input
              type="text"
              name="scholarshipCategory"
              required
              placeholder="e.g., Merit-based"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Degree */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">Degree</label>
          <input
            type="text"
            name="degree"
            required
            placeholder="e.g., Bachelor"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Fees */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Tuition Fees (Optional)</label>
            <input
              type="number"
              name="tuitionFees"
              placeholder="e.g., 15000"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Application Fees</label>
            <input
              type="number"
              name="applicationFees"
              required
              placeholder="e.g., 50"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Service Charge */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">Service Charge</label>
          <input
            type="number"
            name="serviceCharge"
            required
            placeholder="e.g., 20"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Deadline & Post Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Deadline</label>
            <input
              type="date"
              name="deadline"
              required
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Post Date</label>
            <input
              type="date"
              name="postDate"
              required
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        {/* User Email */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2">User Email</label>
          <input
            type="email"
            readOnly
            value={user?.email}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition duration-300 shadow-lg hover:shadow-xl"
        >
          {loading ? "Submitting..." : "Add Scholarship"}
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
