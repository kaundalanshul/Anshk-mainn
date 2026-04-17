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
            ? "py-3.5 bg-white/75 dark:bg-[rgba(7,11,20,0.9)] backdrop-blur-2xl border-b border-gray-200/50 dark:border-[rgba(16,185,129,0.2)] shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "py-5 bg-white/40 dark:bg-[rgba(7,11,20,0.5)] backdrop-blur-xl border-b border-gray-200/30 dark:border-[rgba(16,185,129,0.12)]"
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between">

          {/* ─── Brand Logo ─── */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="text-2xl sm:text-3xl font-black gradient-text tracking-tight">
              AK
            </span>
            <span className="hidden sm:block text-xs text-gray-600 dark:text-slate-400 font-bold tracking-widest uppercase">
              Portfolio
            </span>
          </Link>

          {/* ─── Desktop Nav Links ─── */}
          <nav className="hidden md:flex items-center gap-10 text-xs font-bold tracking-wider">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `relative transition-all duration-300 ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-300 nav-active"
                      : "text-gray-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ─── Right Controls ─── */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              className="p-3 rounded-full glass-sm bg-gradient-to-br from-emerald-600/20 to-teal-600/10 dark:from-emerald-500/15 dark:to-teal-500/10 text-gray-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-200 transition-all duration-300 border border-gray-300/50 dark:border-emerald-500/20 shadow-lg shadow-emerald-500/10"
              aria-label="Toggle dark mode"
            >
              {darkMode
                ? <FaSun  className="w-5 h-5 text-amber-500" />
                : <FaMoon className="w-5 h-5 text-indigo-600" />
              }
            </motion.button>

            {/* ─── Mobile Hamburger ─── */}
            <motion.button
              onClick={() => setMobileOpen(true)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              className="md:hidden p-3 rounded-full glass-sm bg-gradient-to-br from-emerald-600/20 to-teal-600/10 dark:from-emerald-500/15 dark:to-teal-500/10 text-gray-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-200 transition-all duration-300 border border-gray-300/50 dark:border-emerald-500/20"
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
              <div className="flex justify-between items-center px-6 py-5 border-b border-[rgba(16,185,129,0.15)]">
                <span className="text-lg font-bold gradient-text">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-[rgba(16,185,129,0.15)] text-slate-400 hover:text-emerald-300 transition"
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
                        `block py-4 px-6 text-sm font-semibold tracking-widest uppercase border-b border-[rgba(16,185,129,0.08)] transition-colors duration-200 ${
                          isActive
                            ? "text-emerald-300 bg-[rgba(16,185,129,0.1)]"
                            : "text-slate-400 hover:text-emerald-200 hover:bg-[rgba(16,185,129,0.06)]"
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
                      className="flex items-center gap-3 py-4 px-6 border-b border-[rgba(16,185,129,0.08)] text-slate-400 hover:text-emerald-300 transition"
                    >
                      <FaUserCircle /> My Profile
                    </NavLink>
                    <NavLink
                      to="/orders"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 py-4 px-6 border-b border-[rgba(16,185,129,0.08)] text-slate-400 hover:text-emerald-300 transition"
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
