import React from 'react';
import { TrendingUp } from 'lucide-react';


// Analytics Page Component
export const AnalyticsPage = () => (
    <section className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                Platform Analytics
            </h1>
            <div className="bg-gray-800 p-10 rounded-2xl border border-gray-700">
                <TrendingUp size={48} className="mx-auto text-amber-500 mb-4" />
                <p className="text-gray-400 text-lg mb-4">
                    Track performance, bids, and engagement trends.
                </p>
                <p className="text-gray-500">(Analytics dashboard integration coming soon!)</p>
            </div>
        </div>
    </section>
);

// Login Page Component
