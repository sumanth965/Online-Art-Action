import React from 'react';
import { Eye } from 'lucide-react';

const ArtworkListingPage = ({
    filteredArtworks,
    searchTerm,
    filterCategory,
    filterPrice,
    handleSearch,
    handleCategoryFilter,
    handlePriceFilter,
    setSelectedArtwork,
    setCurrentPage
}) => (
    <section className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                Artwork Listings
            </h1>

            {/* Filters */}
            <div className="bg-gray-800 p-6 rounded-2xl mb-8 border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search by title or artist..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                    />
                    <select
                        value={filterCategory}
                        onChange={(e) => handleCategoryFilter(e.target.value)}
                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    >
                        <option value="all">All Categories</option>
                        <option value="Abstract">Abstract</option>
                        <option value="Landscape">Landscape</option>
                        <option value="Digital">Digital</option>
                        <option value="Portrait">Portrait</option>
                    </select>
                    <select
                        value={filterPrice}
                        onChange={(e) => handlePriceFilter(e.target.value)}
                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    >
                        <option value="all">All Prices</option>
                        <option value="low">Below ₹2 Lakh</option>
                        <option value="mid">₹2-3 Lakh</option>
                        <option value="high">Above ₹3 Lakh</option>
                    </select>
                </div>
                <p className="text-gray-400">Found {filteredArtworks.length} artworks</p>
            </div>

            {/* Artworks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtworks.map(artwork => (
                    <div key={artwork.id} className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all hover:shadow-2xl hover:shadow-amber-500/20">
                        <div className="relative h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-5xl">
                            {artwork.image}
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
                            <p className="text-gray-400 text-sm mb-2">by {artwork.artist}</p>
                            <p className="text-amber-400 text-xs mb-4">Category: {artwork.category}</p>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Current Bid:</span>
                                    <span className="text-amber-400 font-bold">₹{artwork.currentBid.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Base Price:</span>
                                    <span className="text-white font-bold">₹{artwork.basePrice.toLocaleString()}</span>
                                </div>
                            </div>
                            <button onClick={() => { setSelectedArtwork(artwork); setCurrentPage('artwork-detail'); }} className="w-full py-2 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                                <Eye size={18} /> View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default ArtworkListingPage;