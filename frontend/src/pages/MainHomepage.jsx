import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ artworks, setCurrentPage, setSelectedArtwork }) => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
      {/* 🟡 Animated Gradient Orb Background */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-amber-500/30 to-orange-500/20 rounded-full blur-3xl pointer-events-none"
        style={{
          left: `${mousePos.x * 0.02}px`,
          top: `${mousePos.y * 0.02}px`,
          transition: "all 0.3s ease-out",
        }}
      ></div>

      {/* ✨ Subtle gold radial accent overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.25),rgba(0,0,0,0))] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-white">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-8 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent tracking-tight drop-shadow-xl">
            Discover Authentic Art
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the world of fine art. Bid on exclusive pieces, support visionary artists, and own timeless masterpieces.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button
              onClick={() => setCurrentPage("artworks")}
              className="px-10 py-3.5 bg-gradient-to-r from-amber-600 to-yellow-500 text-gray-900 rounded-xl font-semibold tracking-wide shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] transition-all duration-300"
            >
              Explore Auctions
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-10 py-3.5 border border-amber-400 text-amber-300 rounded-xl font-semibold tracking-wide hover:bg-amber-400/10 hover:text-amber-200 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Ongoing Auctions */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-amber-400">
            Ongoing Auctions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <div
                key={artwork.id}
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20"
              >
                <div className="relative h-48 overflow-hidden flex items-center justify-center bg-gradient-to-br from-amber-900/30 to-gray-900 text-6xl">
                  {artwork.image}
                  <div className="absolute top-3 right-3 bg-red-600 px-3 py-1 rounded-full text-sm font-bold">
                    LIVE
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">by {artwork.artist}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Bid:</span>
                      <span className="text-amber-400 font-bold">
                        ₹{artwork.currentBid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bids:</span>
                      <span className="text-white font-bold">{artwork.bids}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time Left:</span>
                      <span className="text-orange-400 font-bold">{artwork.timeLeft}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedArtwork(artwork);
                      setCurrentPage("artwork-detail");
                    }}
                    className="w-full py-2 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-amber-400">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🔨",
                title: "Live Bidding",
                desc: "Real-time auction bidding with instant updates",
              },
              {
                icon: "🎨",
                title: "Artist Portal",
                desc: "Upload artworks and manage listings easily",
              },
              {
                icon: "📊",
                title: "Analytics",
                desc: "Comprehensive reports and insights",
              },
              {
                icon: "🔍",
                title: "Smart Search",
                desc: "Filter by category, artist, and price",
              },
              {
                icon: "🔒",
                title: "Secure",
                desc: "JWT authentication and encrypted transactions",
              },
              {
                icon: "📱",
                title: "Mobile Ready",
                desc: "Fully responsive design for all devices",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition-all group hover:shadow-lg hover:shadow-amber-500/10"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
