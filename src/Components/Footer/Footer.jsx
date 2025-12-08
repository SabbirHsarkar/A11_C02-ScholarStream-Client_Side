import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#0e0f2b] text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">
            ScholarStream
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-0.5 rounded text-sm ml-1">
              .com
            </span>
          </h2>

          <p className="text-white/70 leading-relaxed">
            Your trusted platform for scholarships, financial aid, academic
            guidance & global opportunities.
          </p>

          {/* socials mobile */}
          <div className="md:hidden flex gap-4 mt-6">
            {["facebook", "twitter", "instagram", "linkedin"].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 transition"
              >
                {icon === "facebook" && <FaFacebookF />}
                {icon === "twitter" && <FaTwitter />}
                {icon === "instagram" && <FaInstagram />}
                {icon === "linkedin" && <FaLinkedinIn />}
              </a>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <div>
          <h6 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
            Services
          </h6>
          <ul className="space-y-2 text-white/80">
            <li><a href="#" className="hover:text-indigo-300 transition">Education Support</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Financial Aid</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Career Guidance</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Student Counselling</a></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h6 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
            Company
          </h6>
          <ul className="space-y-2 text-white/80">
            <li><Link to="/about" className="hover:text-indigo-300 transition">About Us</Link></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Contact</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Blog & Updates</a></li>
            <li><a href="#" className="hover:text-indigo-300 transition">Support Center</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h6 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
            Newsletter
          </h6>

          <p className="text-white/70 text-sm mb-3">
            Subscribe to receive scholarship alerts & educational updates.
          </p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your email"
              className="input input-bordered w-full bg-white text-black focus:outline-none"
            />
            <button className="btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90">
              Go
            </button>
          </div>

          {/* Social Icons desktop */}
          <div className="hidden md:flex gap-4 mt-6">
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-indigo-500 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* divider line */}
      <div className="mt-12 border-t border-white/10"></div>

      {/* bottom */}
      <p className="mt-6 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} ScholarStream.com — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
