import React from "react";
import AboutSection from '../components/AboutSection';
import Skills from '../components/Skills';

const About = () => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 min-h-screen bg-white dark:bg-slate-950">

      <AboutSection name="Anshul Kaundal" role="FULL STACK DEVELOPER" />
      
      <div className="py-12">
        <Skills />
      </div>
      
    </div>
  );
};

export default About;
