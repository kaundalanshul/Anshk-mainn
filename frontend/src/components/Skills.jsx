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
    <section className="relative overflow-hidden rounded-3xl glass border border-[rgba(139,92,246,0.15)] shadow-glass">
      {/* Corner glow accents */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-6 md:px-12 md:py-9">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-8">

          {/* ── Left: Heading ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center md:text-left shrink-0"
          >
            <h3 className="text-2xl font-extrabold gradient-text mb-1">
              Skills &amp; Tools
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-[220px]">
              Tools I use to craft human-centered interfaces.
            </p>
          </motion.div>

          {/* ── Right: Skill Pills ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center md:justify-end gap-2.5"
          >
            {skills.map((s) => (
              <motion.span
                key={s.name}
                variants={pillVariants}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="skill-pill cursor-pointer select-none"
              >
                <span className="text-base leading-none">{s.emoji}</span>
                {s.name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
