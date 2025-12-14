import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 font-medium transition rounded-lg ${
            isActive
              ? "text-teal-600 bg-teal-50"
              : "text-gray-700 hover:text-teal-600 hover:bg-teal-50"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/all-scholarships"
        className={({ isActive }) =>
          `px-4 py-2 font-medium transition rounded-lg ${
            isActive
              ? "text-teal-600 bg-teal-50"
              : "text-gray-700 hover:text-teal-600 hover:bg-teal-50"
          }`
        }
      >
        All Scholarships
      </NavLink>
    </>
  );

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 left-0 z-50 border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl border-2 border-teal-500 flex items-center justify-center text-teal-600 font-extrabold text-xl shadow-sm group-hover:shadow-md transition">
            S
          </div>
          <span className="font-bold text-2xl text-gray-800 tracking-wide group-hover:text-teal-700 transition">
            ScholarStream
          </span>
        </Link>

        {/* CENTER NAV */}
        <div className="hidden md:flex gap-6">{navItems}</div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">

          {/* IF USER LOGGED IN */}
          {user ? (
            <>
              {/* PROFILE DROPDOWN */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={user?.photoURL}
                    alt="profile"
                    className="w-10 h-10 rounded-full border border-teal-500 shadow-sm object-cover"
                  />
                  <FaChevronDown className="text-gray-600" />
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-3 shadow-xl bg-white rounded-xl w-52 mt-3 border border-teal-100"
                >
                  <li>
                    <Link to="/dashboard-drop" className="text-gray-700 hover:text-teal-600">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logOut}
                      className="text-red-500 font-semibold hover:bg-red-50 rounded-md"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>

              {/* DASHBOARD BUTTON */}
              <Link
                to="/dashboard"
                className="border border-teal-600 hover:bg-teal-600 hover:text-white transition px-5 py-2 rounded-lg font-semibold text-teal-700 shadow-sm"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              {/* LOGIN BUTTON */}
              <Link
                to="/login"
                className="border border-teal-600 hover:bg-teal-600 hover:text-white transition px-5 py-2 rounded-lg font-semibold text-teal-700 shadow-sm"
              >
                Log In
              </Link>

              {/* SIGN UP BUTTON */}
              <Link
                to="/signup"
                className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-lg font-semibold text-white shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <label htmlFor="mobile-drawer" className="md:hidden cursor-pointer ml-3">
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

          <ul className="menu p-6 w-64 bg-white text-gray-700 space-y-4 shadow-xl border-r border-teal-100">
            <h2 className="text-lg font-bold mb-4 text-teal-700">Menu</h2>

            {navItems}

            {!user && (
              <>
                <Link
                  to="/login"
                  className="border border-teal-600 hover:bg-teal-600 hover:text-white px-4 py-2 rounded-lg shadow-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={logOut}
                className="text-red-500 font-semibold mt-3 hover:bg-red-50 rounded-md px-3 py-2"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
