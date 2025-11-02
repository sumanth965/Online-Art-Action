import React from "react";
import { useNavigate } from "react-router-dom";
import { Palette, ShoppingCart, Shield } from "lucide-react";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Palette className="text-amber-500" size={40} />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            ArtVault
          </h1>
          <p className="text-gray-400">Select your role to continue</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 space-y-4">
          <button
            onClick={() => navigate("/buyer-login")}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
            Login as Buyer
          </button>

          <button
            onClick={() => navigate("/artist-login")}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-gray-900 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Palette size={20} className="group-hover:scale-110 transition-transform" />
            Login as Artist
          </button>

          <button
            onClick={() => navigate("/admin-login")}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-gray-900 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Shield size={20} className="group-hover:scale-110 transition-transform" />
            Login as Admin
          </button>
        </div>
      </div>
    </section>
  );
};
