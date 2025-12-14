import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const location=useLocation();


    const{user,loading,roleLoading}=useContext(AuthContext);

    if(loading || roleLoading){
        return <p><span className="loading loading-dots loading-xl"></span></p>
    }
    
    if(user){
        return children
    }
    return <Navigate state={{ from: location.pathname }} to='/login'>

    </Navigate>
};

export default PrivateRoute;