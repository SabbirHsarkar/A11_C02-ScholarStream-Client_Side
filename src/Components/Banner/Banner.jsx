import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section
      className="relative bg-gradient-to-br from-[#0A2A6B] via-[#0F3D91] to-[#1E57C5] text-white py-24 px-6 overflow-hidden"
    >
     
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-indigo-400/20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-14">

        {/* Left  */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg tracking-wide">
            Find Scholarships  
            <span className="block text-blue-200 mt-2">
              That Shape Your Future
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-blue-100 leading-relaxed drop-shadow-sm">
            Access trusted scholarship opportunities worldwide. 
            Compare universities, check eligibility, and apply with confidence.
          </p>

          <Link to="/all-scholarships">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3 bg-white text-blue-800 font-bold rounded-xl 
              shadow-xl hover:bg-blue-50 hover:shadow-2xl transition-all duration-200"
            >
              Search Scholarships
            </motion.button>
          </Link>
        </motion.div>

        {/* Right  */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex justify-center"
        >
          <div className="relative w-11/12 md:w-full">
            <img
              src="https://i.ibb.co.com/23GYtc96/SC.jpg"
              alt="Scholarship Banner"
              className="rounded-3xl shadow-2xl ring-1 ring-white/20 backdrop-blur-lg"
            />

           
            <div className="absolute inset-0 rounded-3xl border border-white/20"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Banner;
