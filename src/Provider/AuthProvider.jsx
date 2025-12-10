import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut ,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const googleProvider=new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role,setRole]=useState('');

  const registerWithEmailPassword = (email, pass) => {
    
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const handleGoogleSignIn=()=>{
    return signInWithPopup(auth,googleProvider)
  }

  console.log(user);
  



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currenUser) => {

      setUser(currenUser)
      setLoading(false)
      

    });
    return()=>{
        unsubscribe()
    }


  }, []);

    useEffect(()=>{
   if(!user) return;
   axios.get(`http://localhost:5000/users/role/${user.email}`)
    .then(res=>{
      setRole(res.data.role);
    })
  },[user])

  console.log(role);
  

  const logOut = () => {
  return signOut(auth);
};
  const authData = {
    registerWithEmailPassword,
    setUser,
    user,
     logOut,
     handleGoogleSignIn,
     loading
     
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
