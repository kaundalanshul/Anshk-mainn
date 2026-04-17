import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExternalLinkAlt, FaFigma, FaClock, FaUserTie, FaTools } from "react-icons/fa";
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
        if (res.data.success) setProject(res.data.project);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading project...</p>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass rounded-3xl p-12 border border-[rgba(139,92,246,0.15)]">
          <div className="text-5xl mb-4">📂</div>
          <h1 className="text-2xl font-extrabold text-slate-100 mb-3">Project not found</h1>
          <Link to="/projects" className="btn-outline text-sm mt-2 inline-flex items-center gap-2">
            <FaArrowLeft className="text-xs" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 sm:py-8">
      {/* ─── Back Button ─── */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors duration-200 group"
        >
          <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>
      </div>

      {/* ─── Hero Card ─── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4"
      >
        <div className="rounded-3xl overflow-hidden border border-[rgba(139,92,246,0.15)] shadow-glass"
          style={{ background: "rgba(10,14,28,0.75)", backdropFilter: "blur(20px)" }}
        >
          {/* Image */}
          <div className="relative overflow-hidden h-52 sm:h-72 md:h-96">
            <img
              src={project.image || "https://placehold.co/1200x600/0c1224/8b5cf6?text=Project"}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x600/0c1224/8b5cf6?text=Project"; }}
            />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(10,14,28,0.9) 0%, rgba(10,14,28,0.3) 50%, transparent 100%)" }} />
            {project.category && (
              <span className="absolute top-5 left-5 skill-pill text-xs">{project.category}</span>
            )}
          </div>

          {/* Content */}
          <div className="p-5 sm:p-8 md:p-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 mb-3 leading-tight">
              {project.title}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Meta grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-7">
              {[
                { icon: FaClock,   label: "Duration", value: project.duration },
                { icon: FaUserTie, label: "Role",     value: project.role },
                { icon: FaTools,   label: "Tools",    value: (project.tools || []).join(", ") },
              ].map(({ icon: Icon, label, value }) =>
                value ? (
                  <div key={label}
                    className="rounded-2xl p-3 sm:p-4 border border-[rgba(139,92,246,0.12)] bg-[rgba(139,92,246,0.05)]"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="text-emerald-400 text-xs" />
                      <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
                    </div>
                    <p className="font-semibold text-sm text-slate-200">{value}</p>
                  </div>
                ) : null
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {project.liveLink && (
                <a
                  href={project.liveLink.startsWith("http") ? project.liveLink : `https://${project.liveLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm px-6 py-2.5"
                >
                  <span className="flex items-center gap-2">
                    <FaExternalLinkAlt className="text-xs" /> View Live
                  </span>
                </a>
              )}
              {project.figmaLink && (
                <a
                  href={project.figmaLink.startsWith("http") ? project.figmaLink : `https://${project.figmaLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm px-6 py-2.5"
                >
                  <FaFigma className="text-xs" /> Figma File
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Overview ─── */}
      {project.overview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="max-w-5xl mx-auto px-4 mt-8"
        >
          <div className="rounded-3xl p-6 md:p-10 border border-[rgba(139,92,246,0.15)] shadow-glass"
            style={{ background: "rgba(10,14,28,0.72)", backdropFilter: "blur(20px)" }}
          >
            <h2 className="text-2xl font-extrabold gradient-text mb-4">Overview</h2>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{project.overview}</p>
          </div>
        </motion.div>
      )}

      {/* ─── Gallery ─── */}
      {project.gallery && project.gallery.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="max-w-5xl mx-auto px-4 mt-8"
        >
          <h2 className="text-2xl font-extrabold gradient-text mb-5">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {project.gallery.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden border border-[rgba(139,92,246,0.12)] card-lift"
              >
                <img
                  src={img}
                  alt={`${project.title} – Image ${i + 1}`}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── CTA ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.45 }}
        className="max-w-5xl mx-auto px-4 mt-8 mb-12"
      >
        <div
          className="rounded-3xl p-8 md:p-12 text-center border border-[rgba(139,92,246,0.18)] relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(15,10,35,0.92) 0%, rgba(60,20,90,0.7) 100%)", backdropFilter: "blur(20px)" }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)" }} />
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 mb-2 relative z-10">
            Interested in working together?
          </h3>
          <p className="text-slate-400 text-sm mb-6 relative z-10">
            I'm available for freelance projects and collaborations.
          </p>
          <Link to="/contact" className="btn-primary text-sm px-8 py-3 relative z-10 inline-flex">
            <span>Get in Touch</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
