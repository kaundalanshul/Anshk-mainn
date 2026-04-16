import React from "react";
import Hero from "../components/Hero";
import ProjectsGrid from "../components/ProjectsGrid";
import Skills from "../components/Skills";

const Home = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-16">
      <Hero />
      <ProjectsGrid />
      {/* Section divider */}
      <div className="section-divider" />
      <Skills />
    </div>
  );
};

export default Home;
