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

import AddScholarship from '../Pages/AddScholarship/AddScholarship';
import ManageScholarship from '../Pages/ManageScholarship/ManageScholarship';
import UpdateScholarship from '../Pages/UpdateScholarship';
import AllScholarships from '../Pages/AllScholarships';
import ScholarshipDetails from '../Pages/ScholarshipDetails/ScholarshipDetails';
import MyProfile from '../Pages/MyProfile/MyProfile';
import ManageUsers from '../Pages/ManageUsers/ManageUsers';
import ManageAppliedApplications from '../Pages/Moderator/ManageAppliedApplications';
import AllReviews from '../Pages/Moderator/AllReviews';
import MyApplications from '../Pages/Student/MyApplications';
import ApplyScholarship from '../Pages/ApplyScholarship';
import MyReview from '../Pages/Student/MyReview';
import Checkout from '../Pages/Checkout/Checkout';
import PaymentSuccess from '../Pages/PaymentSuccess';
import Analytics from '../Pages/Analytics/Analytics';
import PaymentFailed from '../Pages/PaymentFailed';

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
   
    children:[
        { 
         path: "/",
    Component:Home,
       
        },
          {
         path: "/all-scholarships",
    Component:AllScholarships,
       
        },
        {
         path: "/login",
    Component:Login,
       
        },
        {
  path: "/scholarship/:id",
  Component:ScholarshipDetails
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
  element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
  children:[
    {
      path:'profile',
      Component:MyProfile
    },
    {
      path:'add-scholarship',
      Component:AddScholarship
    },
     {
      path:'manage-scholarship',
      Component:ManageScholarship
    },
     {
      path:'update-scholarship/:id',
      Component:UpdateScholarship
    },
     {
      path:'manage-users',
      Component:ManageUsers
    },
    {
      path:'analytics',
      Component:Analytics
    },

     {
      path:'manage-application',
      Component:ManageAppliedApplications
    },
    {
      path:'all-review',
      Component:AllReviews
    },
     {
      path:'my-applications',
      Component:MyApplications
    },
     {
      path:'apply-scholarship',
      Component:ApplyScholarship
    },
     {
      path:'my-review',
      Component:MyReview
    },
    {
  path: "checkout/:id",
  element:<Checkout>

  </Checkout>},
  {
  path: "payment-success/:id",
  Component:PaymentSuccess
},
  {
  path: "payment-failed",
  Component:PaymentFailed
},

  ]

  }
]);