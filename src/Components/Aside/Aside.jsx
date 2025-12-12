import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaBook, 
  FaPlusCircle, 
  FaChartLine,
 FaHome ,
  FaBars,
  FaTimes
} from "react-icons/fa";

const AdminAside = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();

  const linkStyle =
    "flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition";

  const activeStyle =
    "flex items-center gap-3 px-4 py-2 rounded-lg font-semibold bg-indigo-600 text-white shadow";

  return (
    <>
      {/* Mobile Navbar Toggle */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 shadow">
        <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          bg-white shadow-xl p-5 flex flex-col gap-6 
          fixed top-0 left-0 z-50 w-64
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:w-64
        `}
      >
        {/* Logo */}
        <div className="text-center mb-4 ">
          <h1 className="text-2xl font-bold text-indigo-600">Admin Panel</h1>
          <p className="text-sm text-gray-500">ScholarStream</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">

            
          <NavLink
            to="/dashboard/profile"
            onClick={() => setIsOpen(false)}
  className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
            
          >
            <FaTachometerAlt /> My Profile
          </NavLink>

          <h3 className="text-gray-400 font-semibold text-sm mt-4 mb-1">
            USER MANAGEMENT
          </h3>

          <NavLink
            to="/dashboard/manage-users"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
          >
            <FaUsers /> Manage Users
          </NavLink>

          <h3 className="text-gray-400 font-semibold text-sm mt-4 mb-1">
            SCHOLARSHIP MANAGEMENT
          </h3>

          <NavLink
            to="/dashboard/manage-scholarship"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
          >
            <FaBook /> Manage Scholarships
          </NavLink>

          <NavLink
            to="/dashboard/add-scholarship"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
          >
            <FaPlusCircle /> Add Scholarship
          </NavLink>

          <h3 className="text-gray-400 font-semibold text-sm mt-4 mb-1">
            ANALYTICS
          </h3>

          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
          >
            <FaChartLine /> Reports & Insights
          </NavLink>

          <div className="border-t my-4"></div>

          <button
  onClick={() => navigate('/')}
  className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-green-600 hover:bg-green-100 hover:text-green-700 transition"
>
  <FaHome />
  Home
</button>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminAside;
