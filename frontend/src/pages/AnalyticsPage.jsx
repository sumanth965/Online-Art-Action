import React from 'react';
import { TrendingUp } from 'lucide-react';
import useAppState from './useAppState';


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
export const LoginPage = ({ handleLogin }) => (
    <section className="min-h-screen bg-gray-900 flex items-center justify-center py-12">
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-full max-w-md text-center">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                Login as
            </h1>
            <div className="space-y-4">
                <button
                    onClick={() => handleLogin('Buyer')}
                    className="w-full py-3 bg-amber-500 text-gray-900 rounded-lg font-bold hover:bg-amber-600 transition-colors"
                >
                    Buyer
                </button>
                <button
                    onClick={() => handleLogin('Artist')}
                    className="w-full py-3 bg-blue-500 text-gray-900 rounded-lg font-bold hover:bg-blue-600 transition-colors"
                >
                    Artist
                </button>
                <button
                    onClick={() => handleLogin('Admin')}
                    className="w-full py-3 bg-green-500 text-gray-900 rounded-lg font-bold hover:bg-green-600 transition-colors"
                >
                    Admin
                </button>
            </div>
        </div>
    </section>
);