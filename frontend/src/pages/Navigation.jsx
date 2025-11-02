import React from "react";
import {
  Home,
  Palette,
  ShoppingCart,
  BarChart3,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = ({
  isLoggedIn,
  userRole,
  handleLogout,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const navigate = useNavigate(); // ✅ for programmatic navigation (like logout)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-amber-500/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Palette className="text-amber-500 text-2xl" size={28} />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              ArtVault
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all duration-300 flex items-center gap-2"
            >
              <Home size={18} /> Home
            </Link>

            <Link
              to="/artworks"
              className="px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all duration-300 flex items-center gap-2"
            >
              <Palette size={18} /> Artworks
            </Link>

            {isLoggedIn && userRole === "Artist" && (
              <Link
                to="/artist-dashboard"
                className="px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all duration-300 flex items-center gap-2"
              >
                <ShoppingCart size={18} /> Dashboard
              </Link>
            )}

            {isLoggedIn && userRole === "Buyer" && (
              <Link
                to="/buyer-dashboard"
                className="px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all duration-300 flex items-center gap-2"
              >
                <ShoppingCart size={18} /> My Bids
              </Link>
            )}

            {isLoggedIn && userRole === "Admin" && (
              <Link
                to="/admin-panel"
                className="px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all duration-300 flex items-center gap-2"
              >
                <Users size={18} /> Admin
              </Link>
            )}

            {isLoggedIn && (
              <Link
                to="/analytics"
                className="px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all duration-300 flex items-center gap-2"
              >
                <BarChart3 size={18} /> Analytics
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-3">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-gray-900 transition-all duration-300 font-semibold"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  navigate("/"); // ✅ redirect after logout
                }}
                className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500 hover:text-gray-900 transition-all duration-300 font-semibold flex items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-amber-500/20"
            >
              Home
            </Link>

            <Link
              to="/artworks"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 rounded-lg hover:bg-amber-500/20"
            >
              Artworks
            </Link>

            {!isLoggedIn && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2 rounded-lg border border-amber-500 text-amber-400"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
