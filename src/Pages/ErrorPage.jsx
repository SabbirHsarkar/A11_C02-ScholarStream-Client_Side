import React from 'react';
import { useNavigate } from 'react-router';
import errorImg from '../../src/assets/image/error-404.png'

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
       <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-8">

            <img src={errorImg}
                className="w-36 mb-6"
                alt="error" />

            <h1 className="text-3xl font-bold mb-2 text-red-600">Sorry</h1>

            <p className="text-gray-600 mb-6">The page  is not available.</p>

            <button onClick={() => navigate(-1)} className="btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white">Go Back</button>

        </div>
    );
};

export default ErrorPage;