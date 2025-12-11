import React from "react";
import { motion } from "framer-motion";

const testimonialsData = [
  {
    name: "Alice Johnson",
    role: "Master's Student",
    testimonial:
      "Thanks to ScholarStream, I got a scholarship at my dream university in Germany! The process was smooth and transparent.",
    avatar: "https://i.ibb.co.com/n8fy9jBL/P1.jpg",
  },
  {
    name: "Rahul Sharma",
    role: "Undergraduate Student",
    testimonial:
      "I compared multiple scholarships on ScholarStream and found the one that suited my career perfectly.",
    avatar: "https://i.ibb.co.com/20JL3Bwz/P2.jpg",
  },
  {
    name: "Sara Lee",
    role: "PhD Candidate",
    testimonial:
      "ScholarStream saved me a lot of time. I could filter scholarships based on fees, location, and degree.",
    avatar: "https://i.ibb.co.com/kVf1n2rM/P3.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#0B0D17] via-[#1A1F3B] to-[#2C2F50] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 
        bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-lg">
          Success Stories
        </h2>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonialsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white text-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-500"
                />
                <div className="text-left">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{item.testimonial}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
