import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExternalLinkAlt, FaFigma } from "react-icons/fa";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!backendUrl || !projectId) return;
        const res = await axios.get(`${backendUrl}/api/project/${projectId}`);
        if (res.data.success) {
          setProject(res.data.project);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <p className="text-gray-700 dark:text-gray-300">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project not found</h1>
          <Link to="/projects" className="text-purple-600 dark:text-purple-400 hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-4 sm:py-8">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto px-4 mb-4 sm:mb-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <FaArrowLeft />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4"
      >
        <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
          <img
            src={project.image || "https://placehold.co/600x400?text=No+Image"}
            alt={project.title}
            className="w-full h-48 sm:h-64 md:h-96 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          <div className="p-4 sm:p-6 md:p-10">
            <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-4">
              {project.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
              {project.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-lg mb-4 sm:mb-6">{project.description}</p>

            {/* Project Meta */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Duration</p>
                <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{project.duration}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Role</p>
                <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{project.role}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 sm:p-4 col-span-2 md:col-span-1">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Tools</p>
                <p className="font-semibold text-gray-900 dark:text-white">{(project.tools || []).join(", ")}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {project.liveLink && (
                <a
                  href={project.liveLink.startsWith('http') ? project.liveLink : `https://${project.liveLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 dark:bg-purple-700 text-white rounded-xl hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
                >
                  <FaExternalLinkAlt />
                  View Live
                </a>
              )}
              {project.figmaLink && (
                <a
                  href={project.figmaLink.startsWith('http') ? project.figmaLink : `https://${project.figmaLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <FaFigma />
                  Figma File
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-5xl mx-auto px-4 mt-12"
      >
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.overview}</p>
        </div>
      </motion.div>

      {/* Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-5xl mx-auto px-4 mt-12 mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(project.gallery || []).map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl overflow-hidden shadow-md"
            >
              <img
                src={img}
                alt={`${project.title} - Image ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Next Project CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="max-w-5xl mx-auto px-4 mb-12"
      >
        <div className="bg-gray-900 rounded-3xl p-8 text-center">
          <h3 className="text-xl text-white mb-4">Interested in working together?</h3>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
