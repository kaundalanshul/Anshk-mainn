import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: 'easeOut' },
  }),
};

const ProjectsGrid = () => {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        if (!backendUrl) return;
        const res = await axios.get(`${backendUrl}/api/project/list`);
        if (res.data.success && Array.isArray(res.data.projects) && res.data.projects.length > 0)
          setProjects(res.data.projects.filter((p) => p.featured !== false));
        else
          setProjects([]);
      } catch (error) {
        console.error(error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-4 md:py-12">
      <div className="relative overflow-hidden rounded-3xl glass border border-gray-200/50 dark:border-[rgba(16,185,129,0.2)] shadow-xl shadow-gray-200/20 dark:shadow-emerald-900/20 bg-white/60 dark:bg-[rgba(12,18,36,0.4)]">

        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-30 dark:opacity-50"
          style={{ background: 'linear-gradient(to left, rgba(124,58,237,0.15), transparent)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-30 dark:opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }} />

        <div className="px-6 py-8 md:px-14 md:py-14">

          {/* Header row */}
          <div className="flex items-end justify-between mb-10 md:mb-12">
            <div>
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.35em] font-bold text-emerald-600 dark:text-emerald-300 border border-emerald-400/40 dark:border-emerald-500/30 bg-gradient-to-r from-emerald-500/12 to-teal-500/8 dark:from-emerald-500/12 dark:to-teal-500/8 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Featured Work
              </span>
              <h2 className="text-4xl sm:text-5xl font-black gradient-text leading-tight">
                Latest Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden sm:flex items-center gap-2.5 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-bold transition-all group"
            >
              Explore All
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`skel-${i}`}
                  className="rounded-2xl overflow-hidden border border-[rgba(139,92,246,0.12)] animate-pulse"
                  style={{ background: 'rgba(12,18,36,0.45)', height: '340px' }}
                />
              ))
            ) : projects.length === 0 ? (
              <div className="col-span-1 md:col-span-3 flex items-center justify-center py-16">
                <div className="text-center text-slate-500">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: 'rgba(139,92,246,0.1)' }}>
                    <span className="text-2xl">📂</span>
                  </div>
                  <p className="text-base font-medium text-slate-400">No projects found.</p>
                  <p className="text-sm mt-1 text-slate-600">Projects will appear here once added.</p>
                </div>
              </div>
            ) : (
              projects.map((p, i) => (
                <motion.article
                  key={p._id || p.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -8 }}
                  className="card-lift rounded-2xl overflow-hidden group cursor-pointer border border-[rgba(139,92,246,0.12)] relative"
                  style={{ background: 'rgba(10,14,28,0.7)' }}
                >
                  <Link to={`/project/${p._id || p.id}`}>
                    {/* Image */}
                    <div className="relative overflow-hidden h-[280px] sm:h-[340px]">
                      <img
                        src={p.image || 'https://placehold.co/600x400/0c1224/8b5cf6?text=Project'}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/0c1224/8b5cf6?text=Project'; }}
                      />
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 transition-opacity duration-400"
                        style={{ background: 'linear-gradient(to top, rgba(7,11,20,0.95) 0%, rgba(7,11,20,0.4) 50%, transparent 100%)' }} />

                      {/* Emerald glow on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ background: 'linear-gradient(to top, rgba(139,92,246,0.25) 0%, transparent 60%)' }} />

                      {/* Category pill */}
                      {p.category && (
                        <span className="absolute top-4 left-4 skill-pill text-[10px]">
                          {p.category}
                        </span>
                      )}

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-350">
                        <h3 className="font-bold text-xl text-white mb-2 leading-tight">{p.title}</h3>
                        <div className="flex items-center gap-2 text-emerald-300 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          View Case Study
                          <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))
            )}
          </div>

          {/* Mobile "View all" link */}
          <div className="mt-7 flex justify-center sm:hidden">
            <Link to="/projects" className="btn-outline text-sm">
              View All Projects <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
