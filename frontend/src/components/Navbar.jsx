import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { FaUserCircle, FaBoxOpen, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    darkMode,
    toggleDarkMode,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md shadow-lg px-4 sm:px-6 py-5 flex items-center justify-between transition-all duration-300 border-b border-gray-100 dark:border-gray-800">

        {/* Desktop Links */}
        <nav className="flex items-center gap-4 sm:gap-10 text-gray-700 dark:text-gray-300 text-xs sm:text-base font-medium">
          {[
            { to: '/', label: 'HOME' },
            { to: '/projects', label: 'PROJECTS' },
            { to: '/about', label: 'ABOUT' },
            { to: '/contact', label: 'CONTACT' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `hover:text-black dark:hover:text-white transition duration-300 ${
                  isActive ? 'text-black dark:text-white font-semibold underline underline-offset-4' : ''
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side - Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <FaSun className="w-5 h-5 text-yellow-500" />
            ) : (
              <FaMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {/* Mobile Menu Button - Hidden */}
          <button
            onClick={() => setMobileOpen(true)}
            className="hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
          >
            <img src={assets.menu_icon} alt="menu" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 animate-fadeIn"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Mobile Fullscreen Menu */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold tracking-wide text-gray-900 dark:text-white">Menu</h2>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <img
                src={assets.dropdown_icon}
                alt="close"
                className="rotate-180 w-4 h-4"
              />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col text-gray-800 dark:text-gray-200 text-base font-medium">
            {[
              { to: "/", label: "Home" },
              { to: "/projects", label: "Projects" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="py-4 px-6 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                {label}
              </NavLink>
            ))}

            {token && (
              <>
                <div className="px-6 text-center pt-5 pb-2 text-s text-gray-900 dark:text-white uppercase tracking-widest font-semibold">
                  Your Account
                </div>

                <NavLink
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-4 px-6 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <FaUserCircle className="text-gray-600 dark:text-gray-400 w-5 h-5" />
                  <span>My Profile</span>
                </NavLink>

                <NavLink
                  to="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-4 px-6 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <FaBoxOpen className="text-gray-600 dark:text-gray-400 w-5 h-5" />
                  <span>Orders</span>
                </NavLink>

                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 py-4 px-6 text-left border-b border-gray-100 dark:border-gray-700 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  <FaSignOutAlt className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Spacer */}
      <div className="h-20 sm:h-24"></div>
    </>
  );
};

export default Navbar;
