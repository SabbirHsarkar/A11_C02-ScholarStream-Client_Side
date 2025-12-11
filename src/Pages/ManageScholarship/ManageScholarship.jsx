import React, { useContext, useEffect, useState } from 'react';
import HookAxios from '../../Hooks/HookAxios';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router';

const ManageScholarship = () => {

    const [scholarships,setScholarship]=useState([]);
    const axiosInstance=HookAxios();
    const {user}=useContext(AuthContext);
    
     
    useEffect(()=>{
        
        axiosInstance.get(`/manage/scholarship/${user?.email}`)
        .then(res=>{
            setScholarship(res.data)
        })
        .catch((err)=>{
            console.log(err);
            
        })
    },[axiosInstance,user?.email])

    console.log(scholarships);

    
  const handleDelete = (id) => {
    axiosInstance
      .delete(`/scholarships/${id}`)
      .then(res => {
        if (res.data.deletedCount > 0) {
          setScholarship(prev => prev.filter(item => item._id !== id));
          alert("Scholarship Deleted!");
        }
      })
      .catch(err => console.log(err));
  };

    

    return (
       <div className="overflow-x-auto">
  <table className="table">
    
    <thead>
      <tr>
        <th>#</th>
        <th>Scholarship</th>
        <th>University</th>
        <th>Country</th>
        <th>Degree</th>
        <th>App Fees</th>
        <th>Deadline</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {
        scholarships?.map((item, index) => (
          <tr key={item._id}>
            <th>{index + 1}</th>

            {/* Scholarship Image + Name */}
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={item.image} alt="scholarship" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{item.scholarshipName}</div>
                  <div className="text-sm opacity-50">{item.city}</div>
                </div>
              </div>
            </td>

            {/* University */}
            <td className="font-semibold">{item.universityName}</td>

            {/* Country */}
            <td>{item.country}</td>

            {/* Degree */}
            <td>{item.degree}</td>

            {/* Application Fees */}
            <td>${item.applicationFees}</td>

            {/* Deadline */}
            <td className="text-red-500 font-semibold">{item.deadline}</td>

            {/* Actions */}
            <td className="flex gap-2">
             <Link
  to={`/dashboard/update-scholarship/${item._id}`}
  state={item}
  className="btn btn-sm btn-info text-white"
>
  Update
</Link>

     <button
     onClick={() => handleDelete(item._id)}
 className="btn btn-sm btn-error text-white"
     >
                Delete
              </button>
            </td>
          </tr>
        ))
      }
    </tbody>

  </table>
</div>

    );
};

export default ManageScholarship;