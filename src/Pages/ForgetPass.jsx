import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react';
import {  Link, Navigate, useParams } from 'react-router';
import auth from '../firebase/firebase.config';

const ForgetPass = () => {
  
  const {email}=useParams();
  
  


  const handleSubmit =(e)=>{
    e.preventDefault();
    const formEmail=e.target.email.value;
    sendPasswordResetEmail(auth, formEmail)
  .then(() => {
    window.open('https://mail.google.com/mail/u/0/');
  })
  .catch((error) => {
    console.log(error)
  });
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl">
        <div className="card-body p-8">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>

              <input
              defaultValue={email}
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />

              <button className="btn btn-neutral w-full mt-4">
                Reset
              </button>
           <Link to='/login' 
                
      className="btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white mt-3">
      Go Back
    </Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
