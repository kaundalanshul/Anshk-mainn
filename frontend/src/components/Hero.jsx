import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { FaArrowRight, FaEye } from "react-icons/fa";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const defaultHero = {
  role: "FULL STACK DEVELOPER",
  titlePrefix: "Hi, I'm",
  highlightName: "Anshul Kaundal",
  subtitle:
    "I design thoughtful digital experiences with a focus on usability, accessibility and visual storytelling. I work end-to-end — from research and wireframes to high-fidelity prototypes and handoff.",
  primaryCtaText: "View Projects",
  primaryCtaLink: "/projects",
  secondaryCtaText: "Get In Touch",
  secondaryCtaLink: "/contact",
  stats: [
    { value: "50+", label: "Projects Completed" },
    { value: "3+",  label: "Years Experience" },
    { value: "30+", label: "Happy Clients" },
  ],
};

const ROLES = [
  "FULL STACK DEVELOPER",
  "UI / UX DESIGNER",
  "CREATIVE CODER",
];

/* Stagger animation variants */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

/* Typewriter hook */
function useTypewriter(texts, speed = 70, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx]       = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timer;
    if (!deleting && charIdx < current.length) {
      timer = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return display;
}

const Hero = () => {
  const [hero, setHero] = useState(defaultHero);
  const typedRole = useTypewriter(ROLES);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        if (!backendUrl) return;
        const res = await axios.get(`${backendUrl}/api/content/hero`);
        if (res.data.success && res.data.data)
          setHero((prev) => ({ ...prev, ...res.data.data }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchHero();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-[88vh] flex items-center justify-center overflow-hidden"
    >
      {/* ─── Glow Orbs ─── */}
      <div className="absolute w-[600px] h-[600px] rounded-full -top-40 -left-40 z-0 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)" }} />
      <div className="absolute w-[500px] h-[500px] rounded-full bottom-0 right-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)" }} />

      {/* ─── Content Grid ─── */}
      <div className="relative z-10 flex flex-row items-center justify-between w-full px-2 md:px-8 gap-4 lg:gap-12 max-w-[1400px] mx-auto">

        {/* ── Text Column ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-[58%] lg:w-1/2 text-left"
        >
          {/* Role badge with typewriter */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-violet-300 border border-violet-500/30 bg-violet-500/10 mb-3 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span style={{ minWidth: `${Math.max(...ROLES.map((r) => r.length))}ch` }}>{typedRole}</span>
              <span className="typewriter-cursor hidden sm:inline-block" />
            </span>
          </motion.div>

          {/* Headline — serif for formality */}
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-3 sm:mb-6"
          >
            <span className="block text-slate-100 text-lg sm:text-2xl font-medium tracking-widest mb-1 font-sans">
              {hero.titlePrefix}
            </span>
            <span
              className="block gradient-text glow-text mt-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {hero.highlightName}
            </span>
          </motion.h1>

          {/* Subtle horizontal rule */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
            <div className="flex items-center gap-3 max-w-xs">
              <div className="h-px flex-1 bg-gradient-to-r from-violet-500/60 to-transparent" />
              <span className="text-violet-400/60 text-[10px] tracking-[0.4em] font-semibold uppercase">Portfolio</span>
              <div className="h-px w-6 bg-violet-500/30" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-[11px] sm:text-lg leading-relaxed mb-4 sm:mb-8 max-w-xl line-clamp-3 sm:line-clamp-none"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            <Link to="/projects" className="btn-primary text-[11px] sm:text-sm px-4 py-2 sm:px-7 sm:py-3.5">
              <span className="flex items-center gap-2">
                {hero.primaryCtaText} <FaEye className="text-xs" />
              </span>
            </Link>
            <Link to="/contact" className="btn-outline text-[11px] sm:text-sm px-4 py-2 sm:px-7 sm:py-3.5">
              <span className="flex items-center gap-2">
                {hero.secondaryCtaText} <FaArrowRight className="text-xs" />
              </span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 sm:gap-5 mt-6 sm:mt-12"
          >
            {(hero.stats || []).map((stat, i) => (
              <div
                key={i}
                role="group"
                aria-label={`${stat.label}: ${stat.value}`}
                className="stat-item text-left relative overflow-hidden shimmer-once"
              >
                <p className="text-base sm:text-3xl font-extrabold gradient-text leading-none" aria-hidden="true">{stat.value}</p>
                <p className="text-slate-500 text-[9px] sm:text-xs mt-1 tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Image Column ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="w-[42%] lg:w-1/2 flex justify-end relative"
        >
          <div className="relative w-[130px] h-[130px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">

            {/* Glow halo behind image */}
            <div className="absolute inset-8 rounded-full animate-pulse-glow" />

            {/* Rotating ring outer */}
            <div className="img-ring-outer" />
            {/* Rotating ring inner */}
            <div className="img-ring-inner" />

            {/* Gradient ring (static) */}
            <div className="absolute inset-5 rounded-full"
              style={{
                background: "conic-gradient(from 180deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6)",
                padding: "2px",
                borderRadius: "50%",
              }}
            >
              <div className="w-full h-full rounded-full" style={{ background: "#070b14" }} />
            </div>

            {/* Profile Image */}
            <div className="absolute inset-7 rounded-full overflow-hidden img-glow border-2 border-violet-500/30 z-10">
              <img
                src={assets.about_img}
                alt="Anshul Kaundal"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Floating experience badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-0 z-20 glass rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-glow-sm hidden sm:block"
            >
              <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">Experience</p>
              <p className="text-base sm:text-2xl font-extrabold gradient-text leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>2+ Yrs</p>
            </motion.div>

            {/* Floating pill top-left */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-2 left-0 sm:-top-4 sm:-left-4 z-20 glass rounded-full px-2 py-1 sm:px-3 sm:py-1.5 hidden sm:flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs text-slate-300 font-medium">Available for work</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2.5, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 border-2 border-violet-500/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gradient-to-b from-violet-400 to-pink-400 rounded-full" />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;