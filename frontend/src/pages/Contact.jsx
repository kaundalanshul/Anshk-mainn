import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaLinkedin, FaGithub,
  FaPaperPlane, FaCheckCircle,
} from "react-icons/fa";
import Footer from "../components/Footer";

/* ─── Static data ─── */
const contactInfo = [
  { icon: FaEnvelope,      label: "Email",    value: "kaundalanshul725@gmail.com", href: "mailto:kaundalanshul725@gmail.com" },
  { icon: FaPhone,         label: "Phone",    value: "8988439700",                 href: "tel:8988439700" },
  { icon: FaMapMarkerAlt,  label: "Location", value: "Hamirpur, India",            href: "#" },
];

const socialLinks = [
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/anshul-kaundal-18877a328/", label: "LinkedIn", hoverCls: "hover:bg-blue-600" },
  { icon: FaGithub,   href: "https://github.com/Kaundalanshul",                     label: "GitHub",   hoverCls: "hover:bg-slate-600" },
  { icon: FaEnvelope, href: "mailto:kaundalanshul725@gmail.com",                     label: "Email",    hoverCls: "hover:bg-pink-600" },
];

const projectTypes  = ["Web Design", "Mobile App Design", "Full Stack Development", "Brand Identity", "Design System", "Other"];
const budgetRanges  = ["Less than ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹2,50,000", "₹2,50,000+", "Let's discuss"];
const processSteps  = [
  { step: "01", title: "Quick Response",     desc: "I'll get back to you within 24 hours to acknowledge your message." },
  { step: "02", title: "Discovery Call",     desc: "A short call to understand your goals, timeline, and scope." },
  { step: "03", title: "Proposal & Timeline", desc: "You'll receive a clear proposal with scope, pricing, and next steps." },
];

/* Shared input class */
const inputCls =
  "w-full px-4 py-3 bg-[rgba(12,18,36,0.6)] border border-[rgba(139,92,246,0.18)] rounded-xl " +
  "focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/15 focus:shadow-[0_0_20px_rgba(139,92,246,0.12)] " +
  "outline-none transition-all duration-300 text-slate-100 placeholder-slate-500 text-sm backdrop-blur-sm";

const Contact = () => {
  const [formData, setFormData]     = useState({ name: "", email: "", subject: "", projectType: "", budget: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted,  setIsSubmitted]  = useState(false);

  const handleChange  = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit  = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", projectType: "", budget: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center pt-4 pb-8 md:pt-2 md:pb-10"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] font-semibold text-violet-300 border border-violet-500/25 bg-violet-500/8 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Contact
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold gradient-text glow-text leading-tight">
          Let's Work Together
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-xl mx-auto">
          Have a project in mind? I'd love to hear about it. Fill out the form and I'll get back to you soon.
        </p>
      </motion.div>

      {/* Main grid */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">

            {/* ── Left info card ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="hidden lg:block lg:col-span-2"
            >
              <div
                className="rounded-3xl p-8 text-white h-full relative overflow-hidden border border-[rgba(139,92,246,0.18)]"
                style={{
                  background: "linear-gradient(135deg, rgba(15,10,35,0.95) 0%, rgba(60,20,90,0.8) 50%, rgba(10,14,28,0.95) 100%)",
                  backdropFilter: "blur(24px)",
                }}
              >
                {/* Glow orbs */}
                <div className="absolute top-0 right-0 w-52 h-52 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)", margin: "-40px" }} />
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)", margin: "-24px" }} />

                <div className="relative z-10">
                  <h2 className="text-2xl font-extrabold text-slate-100 mb-1">Contact Information</h2>
                  <p className="text-slate-400 text-sm mb-8">
                    Fill up the form and I'll get back to you within 24 hours.
                  </p>

                  {/* Contact details */}
                  <div className="space-y-5 mb-10">
                    {contactInfo.map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.href}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.08)] group-hover:bg-violet-600 group-hover:border-violet-500 transition-all duration-300">
                          <item.icon className="text-violet-300 group-hover:text-white transition-colors text-base" />
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs">{item.label}</p>
                          <p className="text-slate-200 font-medium text-sm">{item.value}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  {/* Social links */}
                  <div className="mb-8">
                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">Connect with me</p>
                    <div className="flex gap-3">
                      {socialLinks.map((s, i) => (
                        <motion.a
                          key={i}
                          href={s.href}
                          whileHover={{ scale: 1.12, y: -3 }}
                          whileTap={{ scale: 0.94 }}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.06)] text-slate-400 hover:text-white transition-all duration-300 ${s.hoverCls} hover:border-transparent`}
                          aria-label={s.label}
                        >
                          <s.icon className="text-base" />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Availability + process */}
                  <div className="p-4 rounded-2xl border border-[rgba(139,92,246,0.15)] bg-[rgba(139,92,246,0.05)]">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-sm text-slate-300 font-medium">Available for freelance projects</span>
                    </div>
                    <div className="space-y-3">
                      {processSteps.map((item) => (
                        <div key={item.step} className="flex items-start gap-3">
                          <span className="shrink-0 px-2 py-0.5 rounded-md bg-[rgba(139,92,246,0.15)] text-[10px] font-bold text-violet-300">
                            {item.step}
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-slate-200">{item.title}</p>
                            <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Right form card ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-3"
            >
              <div
                className="rounded-3xl p-5 sm:p-8 border border-[rgba(139,92,246,0.15)]"
                style={{ background: "rgba(10,14,28,0.7)", backdropFilter: "blur(20px)" }}
              >
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 mb-1">Send a Message</h3>
                <p className="text-slate-500 text-sm mb-6">
                  I'd love to hear about your project. Fill out the form below and I'll get back to you as soon as possible.
                </p>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-16"
                    >
                      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                        style={{ background: "rgba(16,185,129,0.12)", boxShadow: "0 0 40px rgba(16,185,129,0.25)" }}>
                        <FaCheckCircle className="text-4xl text-emerald-400" />
                      </div>
                      <h4 className="text-2xl font-extrabold text-slate-100 mb-2">Message Sent!</h4>
                      <p className="text-slate-500">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-4 sm:space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {/* Name & Email */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Your Name *</label>
                          <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputCls} placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email Address *</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputCls} placeholder="john@example.com" />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Subject *</label>
                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className={inputCls} placeholder="Project inquiry" />
                      </div>

                      {/* Project Type & Budget */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Project Type</label>
                          <select name="projectType" value={formData.projectType} onChange={handleChange}
                            className={inputCls + " cursor-pointer appearance-none"}>
                            <option value="" style={{ background: "#0c1224" }}>Select a type</option>
                            {projectTypes.map((t) => <option key={t} value={t} style={{ background: "#0c1224" }}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Budget Range</label>
                          <select name="budget" value={formData.budget} onChange={handleChange}
                            className={inputCls + " cursor-pointer appearance-none"}>
                            <option value="" style={{ background: "#0c1224" }}>Select budget</option>
                            {budgetRanges.map((r) => <option key={r} value={r} style={{ background: "#0c1224" }}>{r}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Your Message *</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} required rows={4}
                          className={inputCls + " resize-none"}
                          placeholder="Tell me about your project, goals, and timeline..." />
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 text-sm transition-all duration-300 disabled:opacity-70 bg-gradient-to-r from-violet-600 to-pink-600 shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_8px_30px_rgba(124,58,237,0.55)]"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message <FaPaperPlane className="text-xs" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer visible on mobile only */}
      <div className="lg:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
