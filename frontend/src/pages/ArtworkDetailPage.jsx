import React from "react";
import { useNavigate } from "react-router-dom";

const ArtworkDetailPage = ({
    selectedArtwork,
    isLoggedIn,
    userRole,
    bidAmount,
    setBidAmount,
    handlePlaceBid,
    bidHistory = [],
}) => {
    const navigate = useNavigate();

    if (!selectedArtwork) {
        return (
            <section className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400 text-lg">
                No artwork selected.
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-gray-900 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ✅ Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    ← Back
                </button>

                {/* ✅ Artwork Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl h-96 flex items-center justify-center text-9xl border border-gray-700">
                        {selectedArtwork.image || "🎨"}
                    </div>

                    {/* Details */}
                    <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
                        <h1 className="text-4xl font-bold mb-2">
                            {selectedArtwork.title || "Untitled Artwork"}
                        </h1>
                        <p className="text-xl text-gray-400 mb-4">
                            by {selectedArtwork.artist || "Unknown Artist"}
                        </p>

                        <div className="bg-gray-700 p-6 rounded-lg mb-6">
                            <p className="text-gray-400 text-sm">Current Bid</p>
                            <p className="text-4xl font-bold text-amber-400">
                                ₹{(selectedArtwork.currentBid || 0).toLocaleString()}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-400 text-sm">Base Price</p>
                                <p className="text-xl font-bold">
                                    ₹{(selectedArtwork.basePrice || 50000).toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-400 text-sm">Total Bids</p>
                                <p className="text-xl font-bold">{selectedArtwork.bids || 0}</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-400 text-sm">Category</p>
                                <p className="text-xl font-bold">
                                    {selectedArtwork.category || "General"}
                                </p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-400 text-sm">Time Left</p>
                                <p className="text-xl font-bold text-orange-400">
                                    {selectedArtwork.timeLeft || "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* ✅ Place Bid */}
                        {isLoggedIn && userRole === "Buyer" && (
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-4">Place Your Bid</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder={`Minimum: ₹${(
                                            (selectedArtwork.currentBid || 0) + 10000
                                        ).toLocaleString()}`}
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
                                    />
                                    <button
                                        onClick={handlePlaceBid}
                                        className="px-6 py-2 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-colors"
                                    >
                                        Place Bid
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ✅ Login Button */}
                        {!isLoggedIn && (
                            <button
                                onClick={() => navigate("/login")}
                                className="w-full px-6 py-3 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-colors mb-6"
                            >
                                Login to Bid
                            </button>
                        )}

                        {/* ✅ Bid History */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Bid History</h3>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {bidHistory.filter((b) => b.artwork === selectedArtwork.title)
                                    .length > 0 ? (
                                    bidHistory
                                        .filter((b) => b.artwork === selectedArtwork.title)
                                        .map((bid, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-gray-700 p-3 rounded-lg flex justify-between"
                                            >
                                                <span className="text-gray-400">{bid.time}</span>
                                                <span className="font-bold text-amber-400">
                                                    ₹{bid.bidAmount.toLocaleString()}
                                                </span>
                                            </div>
                                        ))
                                ) : (
                                    <p className="text-gray-400">
                                        No bids yet. Be the first to bid!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArtworkDetailPage;
