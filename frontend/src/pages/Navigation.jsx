import React, { useState, useEffect } from "react";
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
import { useAuth } from "../context/AuthContext"; // ✅ global auth hook

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Access global authentication state
  const { isLoggedIn, userRole, logout } = useAuth();

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Navigation handler
  const handleNavClick = (path) => {
    setActiveLink(path);
    setMobileMenuOpen(false);
    navigate(path);
  };

  // ✅ Define navigation links dynamically
  const navLinks = [
    { path: "/", label: "Home", icon: Home, show: true },
    { path: "/artworks", label: "Artworks", icon: Palette, show: true },
    {
      path: "/artist-dashboard",
      label: "Dashboard",
      icon: ShoppingCart,
      show: isLoggedIn && userRole === "Artist",
    },
    {
      path: "/buyer-dashboard",
      label: "My Bids",
      icon: ShoppingCart,
      show: isLoggedIn && userRole === "Buyer",
    },
    {
      path: "/admin-panel",
      label: "Admin",
      icon: Users,
      show: isLoggedIn && userRole === "Admin",
    },
    {
      path: "/analytics",
      label: "Analytics",
      icon: BarChart3,
      show: isLoggedIn,
    },
  ];

  const visibleLinks = navLinks.filter((link) => link.show);

  return (
    <>
      {/* ✅ Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 shadow-2xl shadow-amber-500/10"
            : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
          } border-b ${scrolled ? "border-amber-500/40" : "border-amber-500/20"
          } backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* ✅ Brand */}
            <Link
              to="/"
              onClick={() => handleNavClick("/")}
              className="flex items-center space-x-2 cursor-pointer group transition-all duration-300"
            >
              <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg group-hover:shadow-lg group-hover:shadow-amber-500/50 transition-all duration-300">
                <Palette className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                ArtVault
              </span>
            </Link>

            {/* ✅ Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {visibleLinks.map(({ path, label, icon: Icon }) => (
                <button
                  key={path}
                  onClick={() => handleNavClick(path)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 font-medium group relative ${activeLink === path
                      ? "bg-gradient-to-r from-amber-500/30 to-amber-600/20 text-amber-300"
                      : "text-gray-300 hover:text-amber-400"
                    }`}
                >
                  <Icon size={18} className="group-hover:scale-110 transition-transform" />
                  <span>{label}</span>
                  {activeLink === path && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            {/* ✅ Auth Buttons (Desktop) */}
            <div className="hidden lg:flex items-center space-x-3">
              {!isLoggedIn ? (
                <button
                  onClick={() => handleNavClick("/login")}
                  className="px-6 py-2 rounded-lg border-2 border-amber-500 text-amber-400 font-semibold hover:bg-amber-500 hover:text-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    handleNavClick("/");
                  }}
                  className="px-6 py-2 rounded-lg border-2 border-red-500 text-red-400 font-semibold hover:bg-red-500 hover:text-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 flex items-center gap-2"
                >
                  <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                  Logout
                </button>
              )}
            </div>

            {/* ✅ Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2 hover:bg-amber-500/20 rounded-lg transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={24} className="animate-spin" style={{ animationDuration: "0.3s" }} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ✅ Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-l border-amber-500/30 z-40 lg:hidden transition-all duration-500 transform ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } overflow-y-auto shadow-2xl shadow-black/50 animate-slideIn`}
      >
        <div className="p-4 border-b border-amber-500/20 flex items-center justify-between">
          <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Menu
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-amber-500/20 rounded-lg transition-all"
          >
            <X size={20} className="text-amber-400" />
          </button>
        </div>

        {/* ✅ Mobile Links */}
        <div className="p-4 space-y-2">
          {visibleLinks.map(({ path, label, icon: Icon }, index) => (
            <button
              key={path}
              onClick={() => handleNavClick(path)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 font-medium group transform hover:translate-x-2 ${activeLink === path
                  ? "bg-gradient-to-r from-amber-500/40 to-amber-600/20 text-amber-300 shadow-lg shadow-amber-500/20"
                  : "text-gray-300 hover:text-amber-400 hover:bg-amber-500/10"
                }`}
              style={{
                animation: mobileMenuOpen
                  ? `slideInLeft 0.3s ease-out ${index * 0.05}s both`
                  : "none",
              }}
            >
              <Icon size={20} className="group-hover:scale-110 transition-transform" />
              <span>{label}</span>
              {activeLink === path && (
                <div className="ml-auto w-1 h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* ✅ Mobile Auth */}
        <div className="p-4 border-t border-amber-500/20 mt-auto">
          {!isLoggedIn ? (
            <button
              onClick={() => handleNavClick("/login")}
              className="w-full px-4 py-3 rounded-lg border-2 border-amber-500 text-amber-400 font-semibold hover:bg-amber-500 hover:text-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/50"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                handleNavClick("/");
              }}
              className="w-full px-4 py-3 rounded-lg border-2 border-red-500 text-red-400 font-semibold hover:bg-red-500 hover:text-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>
      </div>

      {/* ✅ Animations */}
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideIn { animation: slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </>
  );
};

export default Navigation;
