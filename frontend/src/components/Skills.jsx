import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  'Canva',
  'Photoshop',
  'Adobe',
  'Figma'
];

const Skills = () => {
  return (
    <section className="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-700 shadow-lg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-4 md:px-12 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-6">
          {/* Left: heading + description */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Skills & Tools
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-sm mt-1 whitespace-nowrap">
              Tools and disciplines I use to craft human-centered interfaces.
            </p>
          </motion.div>

          {/* Right: skill pills */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap justify-center md:justify-end gap-3"
          >
            {skills.map((s) => (
              <span
                key={s}
                className="px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-100 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
