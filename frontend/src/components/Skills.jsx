import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Figma',       emoji: '🎨' },
  { name: 'Canva',       emoji: '✏️' },
  { name: 'Photoshop',   emoji: '🖼️' },
  { name: 'Adobe XD',    emoji: '⚡' },
  { name: 'React',       emoji: '⚛️' },
  { name: 'Node.js',     emoji: '🌿' },
  { name: 'MongoDB',     emoji: '🍃' },
  { name: 'Tailwind',    emoji: '💨' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const pillVariants = {
  hidden:  { opacity: 0, scale: 0.8, y: 12 },
  visible: { opacity: 1, scale: 1,   y: 0,  transition: { duration: 0.45, ease: 'easeOut' } },
};

const Skills = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl glass border border-gray-200/50 dark:border-[rgba(16,185,129,0.2)] shadow-xl shadow-gray-200/20 dark:shadow-emerald-900/20 bg-white/60 dark:bg-[rgba(12,18,36,0.4)]">
      {/* Corner glow accents */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none opacity-40 dark:opacity-100"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none opacity-30 dark:opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:px-14 md:py-11">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">

          {/* ── Left: Heading ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center md:text-left shrink-0"
          >
            <h3 className="text-2xl md:text-3xl font-black gradient-text mb-2">
              Skills &amp; Tools
            </h3>
            <p className="text-gray-600 dark:text-slate-400 text-sm font-medium max-w-[240px]">
              Professional technologies I use to create digital experiences.
            </p>
          </motion.div>

          {/* ── Right: Skill Pills ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center md:justify-end gap-3"
          >
            {skills.map((s) => (
              <motion.span
                key={s.name}
                variants={pillVariants}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="skill-pill cursor-pointer select-none"
              >
                <span className="text-lg leading-none">{s.emoji}</span>
                <span className="font-bold">{s.name}</span>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
