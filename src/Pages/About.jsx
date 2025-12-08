import React from "react";

const About = () => {
  return (
    <div className="min-h-screen  text-black py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-lg bg-opacity-30 backdrop-blur-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-[#3A0CA3]">
            About Sabbir Hossain Sarkar
          </h1>
          <p className="text-xl font-medium text-black-300 mb-8">
            A brief overview of who I am, my vision, and my journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#4B0082]">Bio</h2>
            <p className="text-lg text-black leading-relaxed">
              Hi, I'm Sabbir Hossain Sarkar! I am passionate about technology,
              software development, and making a difference in the world. With a
              strong academic background in Computer Science and Engineering,
              I'm always exploring new ideas and techniques to build innovative
              solutions. My goal is to use my skills to create impactful
              applications and contribute to the tech community.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#4B0082]">
              Skills & Expertise
            </h2>
            <ul className="list-disc pl-6 text-lg text-black">
              <li>Web Development (HTML, CSS, JavaScript, React, Node.js)</li>
              <li>Backend Development (Node.js, Express, MySQL)</li>
              <li>AI & Machine Learning</li>
              <li>Cloud Computing (AWS, Firebase)</li>
              <li>Project Management & Agile Methodologies</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-[#4B0082]">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-300 mt-4">
            Feel free to reach out to me for any collaborations, ideas, or just
            to connect!
          </p>
          <div className="mt-6">
            <a
              href="mailto:sabbirhossainarkar575@gmail.com"
              className="btn btn-primary"
            >
              Email Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
