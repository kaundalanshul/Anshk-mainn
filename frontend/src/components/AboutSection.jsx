import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { FaDownload, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const defaultAbout = {
  name: 'Anshul Kaundal',
  role: 'FULL STACK DEVELOPER',
  bio: "I design thoughtful digital experiences with a focus on usability, accessibility and visual storytelling. I work end-to-end — from research and wireframes to high-fidelity prototypes and handoff.",
};

const stats = [
  { value: '20+',  label: 'Projects' },
  { value: '10+',  label: 'Clients' },
  { value: '100%', label: 'Satisfaction' },
];

const AboutSection = ({ name: propName, role: propRole, bio: propBio }) => {
  const [about, setAbout] = useState(defaultAbout);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        if (!backendUrl) return;
        const res = await axios.get(`${backendUrl}/api/content/about`);
        if (res.data.success && res.data.data)
          setAbout((prev) => ({ ...prev, ...res.data.data }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchAbout();
  }, []);

  const name = propName || about.name;
  const role = propRole || about.role;
  const bio  = propBio  || about.bio;

  return (
    <section className="py-10" id="about">
      <div className="relative overflow-hidden rounded-3xl glass border border-[rgba(139,92,246,0.15)] shadow-glass">

        {/* Background accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(139,92,246,0.06), transparent)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)' }} />

        <div className="px-5 py-8 md:px-12 md:py-14">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

            {/* ── Image Column ── */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Glow halo */}
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-60 animate-pulse"
                  style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 70%)', margin: '-20px' }}
                />

                {/* Orbit rings */}
                <div className="absolute inset-0 rounded-full border border-emerald-500/20 scale-[1.15] animate-spin-slow" />
                <div className="absolute inset-0 rounded-full border border-pink-500/12 scale-[1.28] animate-spin-slower" />

                {/* Conic gradient border wrapper */}
                <div
                  className="relative rounded-full p-[3px]"
                  style={{ background: 'conic-gradient(from 0deg, #10b981, #14b8a6, #06b6d4, #10b981)' }}
                >
                  <img
                    src={assets.profile || assets.about_img}
                    alt={name}
                    className="w-40 h-40 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full object-cover bg-surface"
                  />
                </div>

                {/* Floating Experience Badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-3 -right-3 md:bottom-2 md:-right-6 z-20 glass rounded-2xl px-4 py-3 shadow-glow-sm hidden md:block"
                >
                  <p className="text-xs text-slate-400">Experience</p>
                  <p className="text-2xl font-extrabold gradient-text leading-none">2+ Years</p>
                </motion.div>
              </div>
            </motion.div>

            {/* ── Content Column ── */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-center md:text-left"
            >
              {/* Section label */}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] font-semibold text-emerald-300 border border-emerald-500/25 bg-emerald-500/08 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                About Me
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 mb-2 leading-tight">
                Hi, I'm{' '}
                <span className="gradient-text glow-text">{name}</span>
              </h2>

              <h3 className="text-sm sm:text-base text-slate-400 mb-5 font-medium tracking-widest uppercase">
                {role}
              </h3>

              <div className="space-y-3 text-sm sm:text-base text-slate-400 leading-relaxed mb-7">
                <p>{bio || defaultAbout.bio}</p>
                <p className="text-slate-500">
                  Passionate about creating intuitive interfaces that solve real problems. I believe in the power of design to bridge the gap between complex technology and human needs.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
                <a
                  href="/resume.pdf"
                  download="Anshul Kaundal's resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline text-sm"
                >
                  <FaDownload className="text-xs" />
                  Resume
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-5 pt-6 border-t border-[rgba(139,92,246,0.15)]">
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="stat-item text-left"
                  >
                    <h4 className="text-xl sm:text-3xl font-extrabold gradient-text leading-none">{s.value}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
