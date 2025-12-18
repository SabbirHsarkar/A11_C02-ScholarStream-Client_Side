import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-14 px-5">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
            About ScholarStream
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A modern scholarship management platform designed to simplify
            scholarship discovery, application, and administration.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Left */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              What is ScholarStream?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              ScholarStream is a centralized scholarship management system that
              connects students, moderators, and administrators on a single
              platform.
              <br /><br />
              Students can explore available scholarships, submit applications,
              and track their progress, while moderators and admins can manage
              scholarships, review applications, and ensure platform integrity.
            </p>
          </div>

          {/* Right */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              Core Features
            </h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>🎓 Browse and search scholarships with advanced filters</li>
              <li>📝 Online scholarship application system</li>
              <li>💳 Secure application fee payment integration</li>
              <li>⭐ Review and rating system for scholarships</li>
              <li>🛡 Role-based access (Student, Moderator, Admin)</li>
              <li>📊 Admin dashboard with analytics and user management</li>
            </ul>
          </div>
        </div>

        {/* Vision */}
        <div className="mt-12 bg-indigo-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-3 text-center">
            Our Vision
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            ScholarStream aims to make scholarship opportunities more
            transparent, accessible, and efficient by leveraging modern web
            technologies and secure digital processes.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
            Technology Stack
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="font-semibold text-gray-800">Frontend</p>
              <p className="text-gray-600">React, Tailwind CSS, DaisyUI</p>
            </div>

            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="font-semibold text-gray-800">Backend</p>
              <p className="text-gray-600">Node.js, Express.js</p>
            </div>

            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="font-semibold text-gray-800">Database</p>
              <p className="text-gray-600">MongoDB</p>
            </div>

            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="font-semibold text-gray-800">Authentication</p>
              <p className="text-gray-600">Firebase, JWT</p>
            </div>

            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="font-semibold text-gray-800">Payments</p>
              <p className="text-gray-600">Stripe</p>
            </div>

            <div className="bg-white border rounded-xl p-5 shadow-sm">
              <p className="font-semibold text-gray-800">Deployment</p>
              <p className="text-gray-600">Vercel, Netlify</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
