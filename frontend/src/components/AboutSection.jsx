import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const defaultAbout = {
  name: 'Anshul Kaundal',
  role: 'FULL STACK DEVELOPER',
  bio:
    "I design thoughtful digital experiences with a focus on usability, accessibility and visual storytelling. I work end-to-end — from research and wireframes to high-fidelity prototypes and handoff.",
};

const AboutSection = ({ name: propName, role: propRole, bio: propBio }) => {
  const [about, setAbout] = useState(defaultAbout);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        if (!backendUrl) return;
        const res = await axios.get(`${backendUrl}/api/content/about`);
        if (res.data.success && res.data.data) {
          setAbout((prev) => ({ ...prev, ...res.data.data }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAbout();
  }, []);

  const name = propName || about.name;
  const role = propRole || about.role;
  const bio = propBio || about.bio;

  return (
    <section className="py-10" id="about">
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 shadow-sm">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-50 dark:from-purple-900/20 to-transparent -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10" />

        <div className="px-4 py-6 md:px-12 md:py-12">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
              
              {/* Image Column */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative flex justify-center"
              >
                <div className="relative">
                  {/* Rings */}
                  <div className="absolute inset-0 rounded-full border border-gray-200 dark:border-gray-600 scale-110" />
                  <div className="absolute inset-0 rounded-full border border-gray-100 dark:border-gray-600 scale-125" />
                  
                  <img
                    src={assets.profile || assets.about_img}
                    alt={name}
                    className="w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full shadow-2xl object-cover border-4 border-white relative z-10"
                  />
                  {/* Floating Badge */}
                  <div className="absolute bottom-0 right-0 z-20 bg-white dark:bg-gray-800 p-2 sm:p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 hidden md:block">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Experience</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">2+ Years</p>
                  </div>
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center md:text-left"
              >
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 leading-tight">
                  Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">{name}</span>
                </h2>
                <h3 className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 font-medium">{role}</h3>
                
                <div className="space-y-2 sm:space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 sm:mb-8">
                  <p>
                    {bio || "I design thoughtful digital experiences with a focus on usability, accessibility and visual storytelling. I work end-to-end — from research and wireframes to high-fidelity prototypes and handoff."}
                  </p>
                  <p>
                    Passionate about creating intuitive interfaces that solve real problems. I believe in the power of design to bridge the gap between complex technology and human needs.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a 
                    href="/resume.pdf" 
                    download="Anshul Kaundal's resume.pdf"
                    target="_blank"
                    className="px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-full font-medium hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
                  >
                    <FaDownload />
                    Resume
                  </a>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100 dark:border-gray-700">
                  <div>
                    <h4 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">20+</h4>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Projects</p>
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">10+</h4>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Clients</p>
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">100%</h4>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Satisfaction</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
    </section>
  );
};

export default AboutSection;
