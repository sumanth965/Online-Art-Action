import React from 'react';

const BuyerDashboard = ({ userBids }) => (
    <section className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                My Bids
            </h1>
            {userBids.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userBids.map((bid, idx) => (
                        <div key={idx} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition-all">
                            <div className="text-6xl mb-4 text-center">{bid.image}</div>
                            <h3 className="text-xl font-bold mb-2">{bid.title}</h3>
                            <p className="text-gray-400 mb-2">Your Bid: ₹{parseInt(bid.userBid).toLocaleString()}</p>
                            <p className="text-gray-400 mb-2">Current Highest: ₹{bid.currentBid.toLocaleString()}</p>
                            <p className="text-amber-400 font-semibold">Status: {bid.status}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">You haven't placed any bids yet.</p>
            )}
        </div>
    </section>
);

export default BuyerDashboard;