import React from "react";
import { FaGithub, FaHeart, FaLinkedinIn, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/anshul-kaundal-18877a328/",
    label: "LinkedIn",
    hoverClass: "hover:bg-blue-600 hover:border-blue-600",
  },
  {
    icon: FaGithub,
    href: "https://github.com/Kaundalanshul",
    label: "GitHub",
    hoverClass: "hover:bg-slate-600 hover:border-slate-600",
  },
  {
    icon: FaEnvelope,
    href: "mailto:kaundalanshul725@gmail.com",
    label: "Email",
    hoverClass: "hover:bg-gradient-to-br hover:from-emerald-500 hover:to-teal-500 hover:border-transparent",
  },
];

const navLinks = [
  { label: "Home",     to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "About",    to: "/about" },
  { label: "Contact",  to: "/contact" },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden rounded-3xl border border-[rgba(139,92,246,0.15)] shadow-glass mt-4 md:mt-12"
      style={{ background: "rgba(10,14,28,0.75)", backdropFilter: "blur(24px)" }}
    >
      {/* Glow accents */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-6 md:px-12 md:py-8">
        {/* ── Top Row ── */}
        <div className="flex flex-row flex-wrap md:flex-nowrap justify-between items-center gap-5 md:gap-8">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <h2 className="text-xl sm:text-2xl font-extrabold gradient-text tracking-tight">
              Anshul Kaundal
            </h2>
            <p className="text-slate-500 text-[10px] sm:text-xs tracking-widest uppercase mt-0.5">
              Full Stack Developer
            </p>
          </motion.div>

          {/* Nav Links */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-4 sm:gap-7 text-[10px] sm:text-xs tracking-widest uppercase font-semibold"
          >
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-slate-500 hover:text-emerald-300 transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </motion.nav>

          {/* Social + Scroll-to-top */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            {socialLinks.map(({ icon: Icon, href, label, hoverClass }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.94 }}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-400
                  border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.06)]
                  hover:text-white transition-all duration-300 text-xs sm:text-sm ${hoverClass}
                `}
              >
                <Icon />
              </motion.a>
            ))}

            {/* Scroll to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Back to top"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-400 border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.06)] hover:text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300 text-xs sm:text-sm"
            >
              <FaArrowUp />
            </motion.button>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="section-divider my-4 sm:my-5" />

        {/* ── Bottom Row ── */}
        <div className="flex flex-row justify-between items-center gap-2 text-[10px] sm:text-xs text-slate-600">
          <p>© 2026 Anshul Kaundal. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <FaHeart className="text-pink-500 animate-pulse mx-0.5" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
