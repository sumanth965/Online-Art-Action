import React from "react";
import { useNavigate } from "react-router-dom";
import { Palette, ShoppingCart, Shield } from "lucide-react";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <Palette className="text-slate-300" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-semibold mb-2 text-slate-50">
            ArtVault
          </h1>
          <p className="text-slate-400 text-sm">Platform for Artists & Collectors</p>
        </div>

        {/* Login Options */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/buyer-login")}
            className="w-full py-3 px-4 bg-slate-800 border border-slate-700 text-slate-50 rounded-lg font-medium transition-colors duration-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-950 flex items-center justify-center gap-3"
          >
            <ShoppingCart size={20} className="text-slate-400" />
            Login as Buyer
          </button>

          <button
            onClick={() => navigate("/artist-login")}
            className="w-full py-3 px-4 bg-slate-800 border border-slate-700 text-slate-50 rounded-lg font-medium transition-colors duration-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-950 flex items-center justify-center gap-3"
          >
            <Palette size={20} className="text-slate-400" />
            Login as Artist
          </button>

          <button
            onClick={() => navigate("/admin-login")}
            className="w-full py-3 px-4 bg-slate-800 border border-slate-700 text-slate-50 rounded-lg font-medium transition-colors duration-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-950 flex items-center justify-center gap-3"
          >
            <Shield size={20} className="text-slate-400" />
            Login as Admin
          </button>
        </div>

        {/* Footer */}
        <p className="text-slate-500 text-xs text-center mt-8">
          © 2025 ArtVault. All rights reserved.
        </p>
      </div>
    </section>
  );
};