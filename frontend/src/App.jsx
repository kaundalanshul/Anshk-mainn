import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

const App = () => {
  const location = useLocation();
  const hideFooter = location.pathname === "/contact";

  return (
    <div>
      {/* ─── Animated Background Layer ─── */}
      <div className="bg-animated" aria-hidden="true" />
      <div className="blob-mid" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />

      {/* ─── Toast Notification ─── */}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        limit={1}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      {/* ─── Global UI Components ─── */}
      <Navbar />

      {/* ─── Main Content ─── */}
      <div className="relative z-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-transparent min-h-screen">
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/projects"            element={<Projects />} />
          <Route path="/project/:projectId"  element={<ProjectDetail />} />
          <Route path="/about"               element={<About />} />
          <Route path="/contact"             element={<Contact />} />
        </Routes>

        {!hideFooter && <Footer />}
      </div>
    </div>
  );
};

export default App;
