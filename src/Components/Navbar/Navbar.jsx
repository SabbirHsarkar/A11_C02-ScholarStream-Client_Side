import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg font-medium transition ${
      isActive
        ? "text-teal-600 bg-teal-50"
        : "text-gray-700 hover:text-teal-600 hover:bg-teal-50"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl border-2 border-teal-500 flex items-center justify-center text-teal-600 font-extrabold text-lg">
            S
          </div>
          <span className="text-xl font-bold text-gray-800">
            ScholarStream
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/all-scholarships" className={navLinkClass}>
            All Scholarships
          </NavLink>
        </nav>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {/* PROFILE */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={user.photoURL}
                    className="w-9 h-9 rounded-full border border-teal-500 object-cover"
                    alt="profile"
                  />
                  <FaChevronDown className="text-gray-600 text-sm" />
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu mt-3 p-3 w-48 bg-white rounded-xl shadow-lg border border-teal-100"
                >
                  <li>
                    <Link to="/dashboard/profile">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={logOut} className="text-red-500">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>

              <Link
                to="/dashboard/profile"
                className="px-4 py-2 border border-teal-600 text-teal-700 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition"
              >
                Dashboard
              </Link>
             <button
                      onClick={logOut}
    className="border border-red-600 hover:bg-red-600 hover:text-white
     transition px-5 py-2 rounded-lg font-semibold text-red-700 shadow-sm"
                    >
                      Logout
                    </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-teal-600 text-teal-700 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <label htmlFor="mobile-drawer" className="md:hidden cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
      </div>

      {/* MOBILE DRAWER */}
      <div className="drawer md:hidden">
        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side z-50">
          <label htmlFor="mobile-drawer" className="drawer-overlay"></label>

          <div className="w-64 bg-white h-full p-6 space-y-4 border-r border-teal-100">
            <h2 className="text-lg font-bold text-teal-700 mb-4">
              ScholarStream
            </h2>

            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/all-scholarships" className={navLinkClass}>
              All Scholarships
            </NavLink>

            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <>
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 rounded-lg hover:bg-teal-50"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logOut}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 border border-teal-600 rounded-lg text-center text-teal-700 font-semibold hover:bg-teal-600 hover:text-white"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 bg-orange-500 text-white rounded-lg text-center font-semibold hover:bg-orange-600 mt-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
