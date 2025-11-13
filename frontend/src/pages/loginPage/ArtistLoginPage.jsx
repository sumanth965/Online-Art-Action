// src/pages/ArtistLoginPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Palette } from "lucide-react";
import ArtistAuthForm from "../../components/loginPage/ArtistAuthForm";

const ArtistLoginPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 transition-all">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-500 mb-8 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back</span>
        </Link>

        {/* Header */}
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-xl bg-pink-500/10 border border-gray-700/50 backdrop-blur-sm">
            <Palette size={32} className="text-red-400" />
          </div>
        </div>

        {/* Child Form */}
        <ArtistAuthForm />

        <p className="text-center text-xs text-gray-500 mt-8">
          Artist access protected by creative cloud security
        </p>
      </div>
    </section>
  );
};

export default ArtistLoginPage;
