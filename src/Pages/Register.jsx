import React, { useContext } from "react";

import { AuthContext } from "../Provider/AuthProvider";
import auth from "../firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router";
import axios from "axios";

const Register = () => {
  const { registerWithEmailPassword, setUser, handleGoogleSignIn } = useContext(AuthContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const photoURL = e.target.photoURL;
    const file=photoURL.files[0];
    const role = e.target.role.value;

    console.log(role);
    
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (pass.length < 6) {
      return alert("Password should be at least 6 characters");
    }

    if (!uppercase.test(pass)) {
      return alert("Password needs at least one uppercase letter");
    }

    if (!lowercase.test(pass)) {
      return alert("Password needs at least one lowercase letter");
    }

    const res= await axios.post(`https://api.imgbb.com/1/upload?key=c220f6de682af6f4d4e97f37e4f3a4a2`,{image:file},
      {
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }
    )

  

    const mainPhotoURL=res.data.data.display_url;
    
    const formData={
      name,
      email,
      pass,
     mainPhotoURL,
     role
    }
    
  
    if(res.data.success==true){
      console.log("Backend Success:", res.data);

      registerWithEmailPassword(email, pass)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: mainPhotoURL,
          
   
        })
          .then(() => {
            setUser(userCredential.user);
            axios.post('http://localhost:5000/users',formData)
            .then(res=>{
              console.log(res);
              
            })
            .catch((err)=>{
              console.log(err);
              
            })
            toast.success("Registration Successful!"); 
             console.log(userCredential.user);
          })
         
      })
      .catch((err) => {
        toast.error("Error registering user"); 
        console.log(err);
      });

 
    }

    
  };

  const googleSignUp = () => {
    handleGoogleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Google sign-up successful!");
      })
      .catch((err) => {
        toast.error("Google sign-up failed");
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl">
        <div className="card-body p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
           
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                name="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <input
                name="photoURL"
                type="file"
                className="input input-bordered w-full"
                placeholder="Paste photo URL"
              />
            </div>

               <select name="role" defaultValue="Choose Role" className="select select-accent">
  <option disabled={true}>Choose Role</option>
  <option value='student'>Student</option>
  <option value='moderator'>Moderator</option>
  
</select>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter password"
              />
            </div>
            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold transition">Register</button>
            <button onClick={googleSignUp} className="btn w-full ">
              <FcGoogle />
            </button>
            <p className="text-center mt-3 text-sm">
              Already have an account?
              <Link to="/login" className="text-blue-600 font-semibold ml-1 link link-hover">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
