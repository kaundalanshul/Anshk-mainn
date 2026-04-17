import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { FaUserCircle, FaBoxOpen, FaSignOutAlt, FaMoon, FaSun, FaTimes, FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { to: "/",        label: "HOME" },
  { to: "/projects", label: "PROJECTS" },
  { to: "/about",   label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {
    setShowSearch, getCartCount, navigate,
    token, setToken, setCartItems,
    darkMode, toggleDarkMode,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setDropdownOpen(false);
  };

  /* Shrink navbar on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ─── Navbar ─── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? "py-3 bg-[rgba(7,11,20,0.85)] backdrop-blur-2xl border-b border-[rgba(139,92,246,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "py-5 bg-[rgba(7,11,20,0.45)] backdrop-blur-xl border-b border-[rgba(139,92,246,0.08)]"
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between">

          {/* ─── Brand Logo ─── */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
              <span className="text-white font-black text-sm tracking-tight">AK</span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-sm font-bold text-slate-100 leading-tight tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Anshul Kaundal
              </span>
              <span className="block text-[9px] text-slate-500 font-medium tracking-[0.25em] uppercase leading-tight">
                Full Stack Dev
              </span>
            </div>
          </Link>

          {/* ─── Desktop Nav Links ─── */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `relative transition-colors duration-300 ${
                    isActive
                      ? "text-violet-300 nav-active"
                      : "text-slate-400 hover:text-violet-200"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ─── Right Controls ─── */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="p-2.5 rounded-full glass-sm text-slate-400 hover:text-violet-300 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode
                ? <FaSun  className="w-4 h-4 text-amber-400" />
                : <FaMoon className="w-4 h-4" />
              }
            </motion.button>

            {/* ─── Mobile Hamburger ─── */}
            <motion.button
              onClick={() => setMobileOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="md:hidden p-2.5 rounded-full glass-sm text-slate-400 hover:text-violet-300 transition-colors"
            >
              <FaBars className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ─── Mobile Overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] z-50"
              style={{
                background: "rgba(10,14,28,0.96)",
                backdropFilter: "blur(32px)",
                borderLeft: "1px solid rgba(139,92,246,0.18)",
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-[rgba(139,92,246,0.15)]">
                <span className="text-lg font-bold gradient-text">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-[rgba(139,92,246,0.15)] text-slate-400 hover:text-violet-300 transition"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col mt-4">
                {[
                  { to: "/",         label: "Home" },
                  { to: "/projects", label: "Projects" },
                  { to: "/about",    label: "About" },
                  { to: "/contact",  label: "Contact" },
                ].map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <NavLink
                      to={to}
                      end={to === "/"}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block py-4 px-6 text-sm font-semibold tracking-widest uppercase border-b border-[rgba(139,92,246,0.08)] transition-colors duration-200 ${
                          isActive
                            ? "text-violet-300 bg-[rgba(139,92,246,0.1)]"
                            : "text-slate-400 hover:text-violet-200 hover:bg-[rgba(139,92,246,0.06)]"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}

                {token && (
                  <>
                    <div className="px-6 py-4 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-semibold">
                      Account
                    </div>
                    <NavLink
                      to="/"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 py-4 px-6 border-b border-[rgba(139,92,246,0.08)] text-slate-400 hover:text-violet-300 transition"
                    >
                      <FaUserCircle /> My Profile
                    </NavLink>
                    <NavLink
                      to="/orders"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 py-4 px-6 border-b border-[rgba(139,92,246,0.08)] text-slate-400 hover:text-violet-300 transition"
                    >
                      <FaBoxOpen /> Orders
                    </NavLink>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="flex items-center gap-3 py-4 px-6 text-left text-red-400 hover:bg-red-500/10 transition"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20 sm:h-24" />
    </>
  );
};

export default Navbar;
