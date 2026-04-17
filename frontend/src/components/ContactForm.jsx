import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheck, FaUser, FaEnvelope, FaPen } from 'react-icons/fa';

const ContactForm = () => {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [focused, setFocused] = useState('');
  const [sending, setSending] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    (async () => {
      try {
        const res  = await fetch('/api/contact', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setSent(true);
          setTimeout(() => {
            setSent(false);
            setForm({ name: '', email: '', subject: '', message: '' });
          }, 3000);
        } else {
          alert(data.message || 'Failed to send message. Please try again.');
        }
      } catch {
        alert('Failed to send message. Check your connection and try again.');
      } finally {
        setSending(false);
      }
    })();
  };

  /* Shared input class helper */
  const inputCls = (field) =>
    `w-full px-4 py-3.5 pl-11 rounded-xl outline-none text-sm transition-all duration-300 text-slate-100 placeholder-slate-500
     ${focused === field
       ? 'border-emerald-500/70 shadow-[0_0_0_3px_rgba(16,185,129,0.18),0_0_20px_rgba(16,185,129,0.1)]'
       : 'border-[rgba(16,185,129,0.18)] hover:border-[rgba(16,185,129,0.32)]'
     }
     bg-[rgba(12,18,36,0.6)] backdrop-blur-md border`;

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 h-full border border-[rgba(16,185,129,0.15)] shadow-glass"
      style={{ background: 'rgba(10,14,28,0.72)', backdropFilter: 'blur(20px)' }}
    >
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 mb-1">Send a Message</h3>
      <p className="text-slate-500 text-sm mb-7">I'd love to hear about your project. Fill out the form below.</p>

      <form onSubmit={submit} className="space-y-4">
        {/* Name & Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <FaUser className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs transition-colors ${focused === 'name' ? 'text-emerald-400' : 'text-slate-500'}`} />
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused('')}
              placeholder="Your name"
              className={inputCls('name')}
            />
          </div>
          <div className="relative">
            <FaEnvelope className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs transition-colors ${focused === 'email' ? 'text-emerald-400' : 'text-slate-500'}`} />
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused('')}
              placeholder="Your email"
              className={inputCls('email')}
            />
          </div>
        </div>

        {/* Subject */}
        <div className="relative">
          <FaPen className={`absolute left-4 top-1/2 -translate-y-1/2 text-xs transition-colors ${focused === 'subject' ? 'text-emerald-400' : 'text-slate-500'}`} />
          <input
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            onFocus={() => setFocused('subject')}
            onBlur={() => setFocused('')}
            placeholder="Subject"
            className={inputCls('subject')}
          />
        </div>

        {/* Message */}
        <textarea
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          onFocus={() => setFocused('message')}
          onBlur={() => setFocused('')}
          placeholder="Tell me about your project..."
          rows={5}
          className={`
            w-full px-4 py-3.5 rounded-xl outline-none text-sm transition-all duration-300 resize-none
            text-slate-100 placeholder-slate-500 bg-[rgba(12,18,36,0.6)] backdrop-blur-md border
            ${focused === 'message'
              ? 'border-emerald-500/70 shadow-[0_0_0_3px_rgba(16,185,129,0.18),0_0_20px_rgba(16,185,129,0.1)]'
              : 'border-[rgba(16,185,129,0.18)] hover:border-[rgba(16,185,129,0.32)]'
            }
          `}
        />

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={sent || sending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={`
            w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2
            transition-all duration-300 text-sm relative overflow-hidden
            ${sent
              ? 'bg-emerald-600 shadow-[0_0_24px_rgba(16,185,129,0.35)]'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.55)]'
            }
          `}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.span
                key="sent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <FaCheck /> Message Sent!
              </motion.span>
            ) : sending ? (
              <motion.span
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </motion.span>
            ) : (
              <motion.span
                key="send"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                Send Message <FaPaperPlane className="text-xs" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>

      {/* Trust indicators */}
      <div className="mt-6 pt-5 border-t border-[rgba(16,185,129,0.12)]">
        <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Usually responds in 48 hrs
          </span>
          <span className="text-slate-700">•</span>
          <span>100% Response Rate</span>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
