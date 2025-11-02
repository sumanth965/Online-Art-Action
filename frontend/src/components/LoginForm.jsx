import React, { useState } from "react";
import {
    Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Loader, ArrowLeft
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


export const LoginForm = ({ title, subtitle, color, icon: Icon, onSubmit, onBack, testCredentials }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        // ✅ Email format check
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        // ✅ Specific check for Admin credentials
        if (title === "Admin Login") {
            if (email !== "sumanth@gmail.com" || password !== "123") {
                setError("Invalid admin credentials");
                return;
            }
        }

        if (password.length < 3) {
            setError("Password must be at least 3 characters");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                onSubmit({ email, password, rememberMe });
            }, 1500);
        }, 1500);
    };

    const navigate = useNavigate(); // ✅ for redirect after logout

    const fillTestCredentials = () => {
        setEmail(testCredentials.email);
        setPassword(testCredentials.password);
        setError("");
    };

    const colors = {
        amber: { gradient: "from-amber-500 to-amber-600", text: "text-amber-400" },
        blue: { gradient: "from-blue-500 to-blue-600", text: "text-blue-400" },
        green: { gradient: "from-green-500 to-green-600", text: "text-green-400" },
    };
    const c = colors[color];

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                <Link
                    to="/login"
                    onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors mb-8">
                    <ArrowLeft size={18} /> Back
                </Link>

                <div className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50">
                    <div className="flex justify-center mb-6">
                        <div className={`p-3 rounded-full bg-gradient-to-br ${c.gradient}`}>
                            <Icon className="text-gray-900" size={28} />
                        </div>
                    </div>

                    <h2 className={`text-3xl font-bold text-center mb-1 ${c.text}`}>{title}</h2>
                    <p className="text-gray-400 text-center mb-8 text-sm">{subtitle}</p>

                    {error && <p className="text-red-400 text-sm mb-3 flex items-center gap-2"><AlertCircle size={16} /> {error}</p>}
                    {success && <p className="text-green-400 text-sm mb-3 flex items-center gap-2"><CheckCircle size={16} /> Success! Redirecting...</p>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-2.5 bg-gradient-to-r ${c.gradient} text-gray-900 font-bold rounded-lg`}
                            disabled={loading}
                        >
                            {loading ? <Loader className="animate-spin inline mr-2" size={18} /> : "Login"}
                        </button>
                    </form>

                    <div className="mt-6 border-t border-gray-700 pt-4">
                        <button
                            onClick={fillTestCredentials}
                            disabled={loading}
                            className="w-full py-2 px-4 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                        >
                            Use Test Account
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
