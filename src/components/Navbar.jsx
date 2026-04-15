// Navbar.jsx

import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import SearchBar from "./SearchBar";

/*
  Modern Navbar with Mobile Menu
*/
const Navbar = ({ search, setSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link to="/" className="flex-shrink-0">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
            >
              ProductHub
            </motion.h1>
          </Link>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/')
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-indigo-400 hover:bg-slate-800/50'
              }`}
            >
              Products
            </Link>
            <Link
              to="/add"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/add')
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'
              }`}
            >
              Add Product
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* MOBILE SEARCH */}
              <div className="px-3 py-2">
                <SearchBar search={search} setSearch={setSearch} />
              </div>

              {/* MOBILE NAV LINKS */}
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all ${
                  isActive('/')
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:text-indigo-400 hover:bg-slate-800/50'
                }`}
              >
                Products
              </Link>
              <Link
                to="/add"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all ${
                  isActive('/add')
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                Add Product
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;