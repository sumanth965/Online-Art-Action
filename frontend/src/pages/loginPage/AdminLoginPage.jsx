// src/pages/admin/AdminLoginPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import AdminLoginForm from "../../components/loginPage/AdminLoginForm";

const AdminLoginPage = ({ handleLogin, onBack }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (email, password, rememberMe) => {
        setError("");
        setSuccess(false);

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (email !== "sumanth@gmail.com" || password !== "123") {
            setError("Invalid admin credentials");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                handleLogin("Admin", { email, password, rememberMe });
            }, 1500);
        }, 1500);
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center py-12 px-4 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <Link
                    to="/login"
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-500 mb-8 hover:text-gray-300 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm">Back</span>
                </Link>

                {/* Main login card */}
                <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-2xl p-8 rounded-2xl border border-gray-700/40 shadow-2xl">
                    <div className="flex justify-center mb-8">
                        <div className="p-4 rounded-xl bg-green-500/10 border border-gray-700/50 backdrop-blur-sm">
                            <Shield size={32} className="text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold tracking-tight mb-2 text-green-400">
                            Admin Login
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Manage the platform
                        </p>
                    </div>

                    {/* Pass props to form */}
                    <AdminLoginForm
                        onSubmit={handleSubmit}
                        loading={loading}
                        success={success}
                        error={error}
                    />
                </div>

                <p className="text-center text-xs text-gray-500 mt-8">
                    Protected by enterprise-grade security
                </p>
            </div>
        </section>
    );
};

export default AdminLoginPage;
