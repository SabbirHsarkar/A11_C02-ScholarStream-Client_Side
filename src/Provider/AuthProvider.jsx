import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut ,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const googleProvider=new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const registerWithEmailPassword = (email, pass) => {
    
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const handleGoogleSignIn=()=>{
    return signInWithPopup(auth,googleProvider)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currenUser) => {

      setUser(currenUser)
      setLoading(false)

    });
    return()=>{
        unsubscribe()
    }


  }, []);

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
