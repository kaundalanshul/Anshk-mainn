import React from "react";
import AboutSection from '../components/AboutSection';
import Skills from '../components/Skills';

const About = () => {
  return (
    <div className="border-t min-h-screen">

      <AboutSection name="Anshul Kaundal" role="FULL STACK DEVELOPER" />
      
      <div className="py-12">
        <Skills />
      </div>
      
    </div>
  );
};

export default About;
