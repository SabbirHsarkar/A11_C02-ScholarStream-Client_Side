import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Login = () => {

   const { setUser,user,handleGoogleSignIn } = useContext(AuthContext);

   const location=useLocation();
   const navigate=useNavigate();
   const [email,setEmail]=useState('');

  


// const handleSubmit = (e) => {
//   e.preventDefault();
  
//   const email = e.target.email.value;
//   const pass = e.target.password.value;

  

//   signInWithEmailAndPassword(auth, email, pass)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       setUser(user);
//       navigate('/');
      
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

const handleSubmit = (e) => {
  e.preventDefault();
  
  const email = e.target.email.value;
  const pass = e.target.password.value;

  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      setUser(user);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back ",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate('/');
    })
    .catch((error) => {
      let message = "Login failed";

      if (error.code === "auth/wrong-password") {
        message = "Incorrect password ";
      } else if (error.code === "auth/user-not-found") {
        message = "No account found with this email ";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email format ";
      }

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
      });
    });
};


console.log(user);

const googleSignIn=()=>{
  handleGoogleSignIn()
  .then(result=>{
    const user=result.user
    setUser(user)
    navigate(location?.state?.from || "/profile");
  })
  .catch(err=>console.log(err))
  
}

const handleForget=()=>{
  navigate(`/forget/${email}`)


}


  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl">
        <div className="card-body p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Log in</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>

              <input
              onChange={(e)=>setEmail(e.target.value)}
                name="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>


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

            <div className="flex justify-between text-sm">
              <button onClick={handleForget} className="link link-hover">
               
                Forgot password?
            
              </button>
            </div>

         <button onClick={googleSignIn} className="btn w-full "><FcGoogle /></button>

            <button className=" w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold transition">Login</button>

           

            <p className="text-center mt-3 text-sm">
              Don't have an account?
              <Link
                to="/signup"
                className="text-blue-600 font-semibold ml-1 link link-hover"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
