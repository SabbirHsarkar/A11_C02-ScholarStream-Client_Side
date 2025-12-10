import React, { Component } from 'react';

import { createBrowserRouter } from "react-router";
import Root from '../Root/Root';
import Home from '../Home/Home';
import About from '../Pages/About';

import Login from '../Pages/Login';
import Register from '../Pages/Register';

import PrivateRoute from './PrivateRoute';

import UpdateProfile from '../Pages/UpdateProfile';
import ForgetPass from '../Pages/ForgetPass';
import ErrorPage from '../Pages/ErrorPage';
import Dashboard from '../Pages/Dashboard';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import MainDashBoard from '../Pages/MainDashboard/MainDashBoard';
import AddScholarship from '../Pages/AddScholarship/AddScholarship';

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
   
    children:[
        { 
         path: "/",
    Component:Home,
       
        },
    //       {
    //      path: "/service",
    // Component:Services,
       
    //     },
        {
         path: "/login",
    Component:Login,
       
        },
         {
         path: "/signup",
    Component:Register,
       
        },
          {
         path: "/dashboard-drop",
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
       
        },
        
        {
          path:"/forget/:email",
          Component:ForgetPass,
        },
        {
        path: "*",
        Component: ErrorPage
      },
      {
  path: "/update-profile",
  element: (
    <PrivateRoute>
      <UpdateProfile />
    </PrivateRoute>
  )
}
,
{
  path:'/about',
  Component:About
}

        
       
     
    ]
        
        
  },

  {
  path:'/dashboard',
  element:<DashboardLayout></DashboardLayout>,
  children:[
    {
      path:'main',
      Component:MainDashBoard
    },
    {
      path:'add-scholarship',
      Component:AddScholarship
    },
  ]

  }
]);