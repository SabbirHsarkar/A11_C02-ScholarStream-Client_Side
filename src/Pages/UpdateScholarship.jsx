import React, { useState } from "react";
import { useLocation} from "react-router";
import axios from "axios";
import HookAxios from "../Hooks/HookAxios";

const UpdateScholarship = () => {
  const { state } = useLocation(); // Data passed from ManageScholarship
  
  const axiosInstance = HookAxios();

  const [formData, setFormData] = useState({
    scholarshipName: state?.scholarshipName || "",
    universityName: state?.universityName || "",
    country: state?.country || "",
    city: state?.city || "",
    worldRank: state?.worldRank || "",
    subjectCategory: state?.subjectCategory || "",
    scholarshipCategory: state?.scholarshipCategory || "",
    degree: state?.degree || "",
    tuitionFees: state?.tuitionFees || "",
    applicationFees: state?.applicationFees || "",
    serviceCharge: state?.serviceCharge || "",
    deadline: state?.deadline || "",
    postDate: state?.postDate || "",
    image: state?.image || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData(prev => ({ ...prev, [name]: files[0] }));
    else setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageURL = formData.image;

    if (formData.image instanceof File) {
      const form = new FormData();
      form.append("image", formData.image);
      try {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=c220f6de682af6f4d4e97f37e4f3a4a2`,
          form
        );
        imageURL = res.data.data.display_url;
      } catch (err) {
        console.log("Image upload error:", err);
        setLoading(false);
        return;
      }
    }

    const updateData = {
      ...formData,
      image: imageURL,
      tuitionFees: parseInt(formData.tuitionFees || 0, 10),
      applicationFees: parseInt(formData.applicationFees || 0, 10),
      serviceCharge: parseInt(formData.serviceCharge || 0, 10),
      worldRank: parseInt(formData.worldRank || 0, 10),
    };

    try {
      await axiosInstance.put(`/scholarships/${state._id}`, updateData);
      alert("Scholarship updated successfully!");

    } catch (err) {
      console.log(err);
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
        Update Scholarship
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label>Scholarship Name</label>
          <input name="scholarshipName" value={formData.scholarshipName} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label>University Name</label>
          <input name="universityName" value={formData.universityName} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label>Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} className="file-input file-input-bordered w-full rounded-lg" />
          {typeof formData.image === "string" && <img src={formData.image} alt="Current" className="mt-2 h-20 w-20 object-cover rounded" />}
        </div>
        {/* Other fields... Country, City, Degree, Fees, Deadline */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Country</label>
            <input name="country" value={formData.country} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label>City</label>
            <input name="city" value={formData.city} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label>Degree</label>
            <input name="degree" value={formData.degree} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label>World Rank</label>
            <input type="number" name="worldRank" value={formData.worldRank} onChange={handleChange} className="input-field" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Tuition Fees</label>
            <input type="number" name="tuitionFees" value={formData.tuitionFees} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label>Application Fees</label>
            <input type="number" name="applicationFees" value={formData.applicationFees} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label>Service Charge</label>
            <input type="number" name="serviceCharge" value={formData.serviceCharge} onChange={handleChange} className="input-field" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Deadline</label>
            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label>Post Date</label>
            <input type="date" name="postDate" value={formData.postDate} onChange={handleChange} className="input-field" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold">
          {loading ? "Updating..." : "Update Scholarship"}
        </button>
      </form>
    </div>
  );
};

export default UpdateScholarship;
