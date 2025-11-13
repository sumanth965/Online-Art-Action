import React, { useState } from "react";
import axios from "axios";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    AlertCircle,
    CheckCircle,
    Loader,
    UserPlus,
    LogIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ArtistAuthForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // ✅ use global login method from context

    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    // 🌐 Backend Base URL
    const API_URL = "http://localhost:5000/api/artists";

    // 🔑 Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!email || !password || (isSignup && !confirmPass)) {
            setError("Please fill in all fields");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (isSignup && password !== confirmPass) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            if (isSignup) {
                // 🔸 SIGNUP
                const res = await axios.post(`${API_URL}/register`, { email, password });
                if (res.data.success) {
                    setSuccess(true);
                    setTimeout(() => {
                        setIsSignup(false);
                        setSuccess(false);
                        setEmail("");
                        setPassword("");
                        setConfirmPass("");
                    }, 1500);
                }
            } else {
                // 🔹 LOGIN
                const res = await axios.post(`${API_URL}/login`, { email, password });

                if (res.data.success) {
                    setSuccess(true);

                    // ✅ Use global context login
                    login("Artist");

                    // Optional: Save token
                    if (rememberMe) localStorage.setItem("artistToken", res.data.token);

                    setTimeout(() => {
                        navigate("/artist-dashboard");
                    }, 1500);
                } else {
                    setError(res.data.message || "Invalid artist credentials");
                }
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // 🎨 Demo Credentials
    const fillTestCredentials = () => {
        setEmail("artist@gmail.com");
        setPassword("123");
        setError("");
    };

    return (
        <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-2xl p-8 rounded-2xl border border-gray-700/40 shadow-2xl">
            {/* Title */}
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-2 text-red-400">
                    {isSignup ? "Artist Sign Up" : "Artist Sign In"}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {isSignup
                        ? "Create your artist account to showcase art"
                        : "Welcome back! Continue your creative journey"}
                </p>
            </div>

            {/* Alerts */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 flex items-center gap-3">
                    <AlertCircle size={16} className="text-red-400" />
                    <p className="text-red-300 text-sm">{error}</p>
                </div>
            )}
            {success && (
                <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3 mb-4 flex items-center gap-3">
                    <CheckCircle size={16} className="text-red-400" />
                    <p className="text-red-300 text-sm">
                        {isSignup ? "Account created!" : "Success! Redirecting..."}
                    </p>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 mb-6">
                {/* Email */}
                <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 text-gray-600" size={18} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="you@example.com"
                            className={`w-full pl-10 pr-4 py-3 bg-gray-700/20 border rounded-lg text-gray-100 placeholder-gray-500 text-sm transition-all ${focusedField === "email"
                                ? "border-pink-500/50 bg-gray-700/30 shadow-lg shadow-pink-500/5"
                                : "border-gray-600/30"
                                }`}
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 text-gray-600" size={18} />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="••••••••"
                            className={`w-full pl-10 pr-10 py-3 bg-gray-700/20 border rounded-lg text-gray-100 placeholder-gray-500 text-sm transition-all ${focusedField === "password"
                                ? "border-pink-500/50 bg-gray-700/30 shadow-lg shadow-pink-500/5"
                                : "border-gray-600/30"
                                }`}
                            disabled={loading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-3.5 text-gray-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password (Signup only) */}
                {isSignup && (
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-3.5 text-gray-600" size={18} />
                            <input
                                type="password"
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/20 border border-gray-600/30 rounded-lg text-gray-100 placeholder-gray-500 text-sm"
                                disabled={loading}
                            />
                        </div>
                    </div>
                )}

                {/* Remember Me */}
                {!isSignup && (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-600/30 bg-gray-700/20 cursor-pointer accent-pink-500"
                        />
                        <label
                            htmlFor="remember"
                            className="ml-2.5 text-xs text-gray-400 cursor-pointer"
                        >
                            Remember me for 30 days
                        </label>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 ${loading
                        ? "bg-gradient-to-r from-red-500 to-red-600 opacity-50 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-500 to-red-600 text-gray-900 shadow-lg shadow-pink-500/20"
                        }`}
                >
                    <div className="flex items-center justify-center">
                        {loading ? (
                            <>
                                <Loader className="animate-spin mr-2" size={18} />
                                {isSignup ? "Creating Account..." : "Authenticating..."}
                            </>
                        ) : isSignup ? (
                            <>
                                <UserPlus size={16} className="mr-2" /> Create Account
                            </>
                        ) : (
                            <>
                                <LogIn size={16} className="mr-2" /> Sign In
                            </>
                        )}
                    </div>
                </button>
            </form>

            {/* Demo Button */}
            {!isSignup && (
                <>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-gray-700/30" />
                        <span className="text-xs text-gray-500">Demo Access</span>
                        <div className="flex-1 h-px bg-gray-700/30" />
                    </div>
                    <button
                        onClick={fillTestCredentials}
                        disabled={loading}
                        className="w-full py-2.5 px-4 bg-gray-700/20 border border-gray-600/30 text-gray-300 text-sm rounded-lg transition-all duration-300 disabled:opacity-50"
                    >
                        Load Test Credentials
                    </button>
                </>
            )}

            {/* Toggle */}
            <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">
                    {isSignup ? "Already have an account?" : "New to ArtVault?"}{" "}
                    <button
                        type="button"
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setError("");
                            setSuccess(false);
                        }}
                        className="text-pink-400 hover:text-pink-300 font-medium transition-colors"
                    >
                        {isSignup ? "Sign In" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ArtistAuthForm;
