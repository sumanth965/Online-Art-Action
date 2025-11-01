import React from 'react';

const HomePage = ({ artworks, setCurrentPage, setSelectedArtwork }) => (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.3),rgba(217,119,6,0))]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                    Discover Authentic Art
                </h1>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                    Participate in live auctions, bid on exceptional artworks, and support emerging artists worldwide
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => setCurrentPage('artworks')} className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 rounded-lg font-bold hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300">
                        Explore Auctions
                    </button>
                    <button onClick={() => setCurrentPage('login')} className="px-8 py-3 border-2 border-amber-500 text-amber-400 rounded-lg font-bold hover:bg-amber-500/10 transition-all duration-300">
                        Get Started
                    </button>
                </div>
            </div>

            {/* Ongoing Auctions */}
            <div className="mt-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Ongoing Auctions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artworks.map(artwork => (
                        <div key={artwork.id} className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20">
                            <div className="relative h-48 bg-gradient-to-br from-purple-600 to-blue-600 overflow-hidden flex items-center justify-center text-6xl">
                                {artwork.image}
                                <div className="absolute top-3 right-3 bg-red-600 px-3 py-1 rounded-full text-sm font-bold">LIVE</div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">{artwork.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">by {artwork.artist}</p>
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Current Bid:</span>
                                        <span className="text-amber-400 font-bold">₹{artwork.currentBid.toLocaleString()}</span>
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
                                <button onClick={() => { setSelectedArtwork(artwork); setCurrentPage('artwork-detail'); }} className="w-full py-2 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className="mt-24">
                <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { icon: '🔨', title: 'Live Bidding', desc: 'Real-time auction bidding with instant updates' },
                        { icon: '🎨', title: 'Artist Portal', desc: 'Upload artworks and manage listings easily' },
                        { icon: '📊', title: 'Analytics', desc: 'Comprehensive reports and insights' },
                        { icon: '🔍', title: 'Smart Search', desc: 'Filter by category, artist, and price' },
                        { icon: '🔒', title: 'Secure', desc: 'JWT authentication and encrypted transactions' },
                        { icon: '📱', title: 'Mobile Ready', desc: 'Fully responsive design for all devices' }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition-all group">
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default HomePage;