import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../Components/Aside/Aside';

const DashboardLayout = () => {
    return (
              <div className="flex min-h-screen">
            
            <div className="w-64 bg-white shadow-lg">
                <Aside />
            </div>

            <div className="flex-1 p-6 bg-[#F5FFFD]">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;