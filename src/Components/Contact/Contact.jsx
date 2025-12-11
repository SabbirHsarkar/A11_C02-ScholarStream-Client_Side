import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#0B0D17] via-[#1A1F3B] to-[#2C2F50] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
      
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12
        bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-lg">
          Contact Us
        </h2>

        <p className="text-gray-300 max-w-3xl mx-auto mb-16 text-lg md:text-xl leading-relaxed">
          Have questions? Reach out to us and we'll help you find the perfect scholarship.
        </p>

       
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white text-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <FaEnvelope className="text-4xl text-indigo-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p>support@scholarstream.com</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white text-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <FaPhone className="text-4xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p>+880 1234 567890</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white text-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <FaMapMarkerAlt className="text-4xl text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
            <p>Dhaka, Bangladesh</p>
          </motion.div>
        </div>

       
      </div>
    </section>
  );
};

export default Contact;
