import React from "react";
import AboutSection from "../components/AboutSection";
import Skills from "../components/Skills";

const About = () => {
  return (
    <div className="min-h-screen">
      <AboutSection name="Anshul Kaundal" role="FULL STACK DEVELOPER" />

      {/* Section divider */}
      <div className="section-divider my-8" />

      <div className="py-4">
        <Skills />
      </div>
    </div>
  );
};

export default About;
