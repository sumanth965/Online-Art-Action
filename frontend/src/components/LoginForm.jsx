// import React, { useState } from "react";
// import {
//     Eye,
//     EyeOff,
//     Mail,
//     Lock,
//     AlertCircle,
//     CheckCircle,
//     Loader,
//     ArrowLeft,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

// export const LoginForm = ({
//     title = "Admin Login",
//     subtitle = "Secure Access Portal",
//     color = "blue",
//     icon: Icon = Lock,
//     onSubmit = () => { },
//     onBack = () => { },
//     testCredentials = { email: "sumanth@gmail.com", password: "123" },
// }) => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [rememberMe, setRememberMe] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState(false);
//     const [focusedField, setFocusedField] = useState(null);
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess(false);

//         if (!email || !password) {
//             setError("Please fill in all fields");
//             return;
//         }

//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//             setError("Please enter a valid email address");
//             return;
//         }

//         if (title === "Admin Login") {
//             if (email !== "sumanth@gmail.com" || password !== "123") {
//                 setError("Invalid admin credentials");
//                 return;
//             }
//         }

//         if (password.length < 3) {
//             setError("Password must be at least 3 characters");
//             return;
//         }

//         setLoading(true);
//         setTimeout(() => {
//             setLoading(false);
//             setSuccess(true);
//             setTimeout(() => {
//                 onSubmit({ email, password, rememberMe });
//             }, 1500);
//         }, 1500);
//     };

//     const fillTestCredentials = () => {
//         setEmail(testCredentials.email);
//         setPassword(testCredentials.password);
//         setError("");
//     };

//     const colors = {
//         amber: {
//             gradient: "from-amber-500 to-amber-600",
//             text: "text-amber-400",
//             light: "bg-amber-500/10",
//         },
//         blue: {
//             gradient: "from-blue-500 to-blue-600",
//             text: "text-blue-400",
//             light: "bg-blue-500/10",
//         },
//         green: {
//             gradient: "from-green-500 to-green-600",
//             text: "text-green-400",
//             light: "bg-green-500/10",
//         },
//     };
//     const c = colors[color];

//     return (
//         <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center py-12 px-4 relative overflow-hidden">
//             {/* Ambient glowing background */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
//                 <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
//             </div>

//             <div className="w-full max-w-md relative z-10">
//                 {/* Back link */}
//                 <Link
//                     to="/login"
//                     onClick={onBack}
//                     className="flex items-center gap-2 text-gray-500 mb-8 hover:text-gray-300 transition-colors"
//                 >
//                     <ArrowLeft size={18} />
//                     <span className="text-sm">Back</span>
//                 </Link>

//                 {/* Glass card */}
//                 <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-2xl p-8 rounded-2xl border border-gray-700/40 shadow-2xl">
//                     {/* Icon */}
//                     <div className="flex justify-center mb-8">
//                         <div
//                             className={`p-4 rounded-xl ${c.light} border border-gray-700/50 backdrop-blur-sm`}
//                         >
//                             <Icon size={32} className="text-gray-400" />
//                         </div>
//                     </div>

//                     {/* Title + Subtitle */}
//                     <div className="mb-8 text-center">
//                         <h2 className={`text-3xl font-bold tracking-tight mb-2 ${c.text}`}>
//                             {title}
//                         </h2>
//                         <p className="text-gray-400 text-sm leading-relaxed">{subtitle}</p>
//                     </div>

//                     {/* Error & Success */}
//                     {error && (
//                         <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 flex items-center gap-3">
//                             <AlertCircle size={16} className="text-red-400" />
//                             <p className="text-red-300 text-sm">{error}</p>
//                         </div>
//                     )}
//                     {success && (
//                         <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4 flex items-center gap-3">
//                             <CheckCircle size={16} className="text-green-400" />
//                             <p className="text-green-300 text-sm">Success! Redirecting...</p>
//                         </div>
//                     )}

//                     {/* Form */}
//                     <form onSubmit={handleSubmit} className="space-y-5 mb-6">
//                         {/* Email */}
//                         <div>
//                             <label className="block text-xs font-semibold text-gray-300 mb-3 uppercase tracking-wider">
//                                 Email Address
//                             </label>
//                             <div className="relative">
//                                 <Mail className="absolute left-3.5 top-3.5 text-gray-600" size={18} />
//                                 <input
//                                     type="email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     onFocus={() => setFocusedField("email")}
//                                     onBlur={() => setFocusedField(null)}
//                                     placeholder="you@example.com"
//                                     className={`w-full pl-10 pr-4 py-3 bg-gray-700/20 border rounded-lg text-gray-100 placeholder-gray-500 text-sm transition-all ${focusedField === "email"
//                                             ? "border-blue-500/50 bg-gray-700/30 shadow-lg shadow-blue-500/5"
//                                             : "border-gray-600/30"
//                                         }`}
//                                     disabled={loading}
//                                 />
//                             </div>
//                         </div>

//                         {/* Password */}
//                         <div>
//                             <label className="block text-xs font-semibold text-gray-300 mb-3 uppercase tracking-wider">
//                                 Password
//                             </label>
//                             <div className="relative">
//                                 <Lock className="absolute left-3.5 top-3.5 text-gray-600" size={18} />
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     onFocus={() => setFocusedField("password")}
//                                     onBlur={() => setFocusedField(null)}
//                                     placeholder="••••••••"
//                                     className={`w-full pl-10 pr-10 py-3 bg-gray-700/20 border rounded-lg text-gray-100 placeholder-gray-500 text-sm transition-all ${focusedField === "password"
//                                             ? "border-blue-500/50 bg-gray-700/30 shadow-lg shadow-blue-500/5"
//                                             : "border-gray-600/30"
//                                         }`}
//                                     disabled={loading}
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute right-3.5 top-3.5 text-gray-600"
//                                 >
//                                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Remember Me */}
//                         <div className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 id="remember"
//                                 checked={rememberMe}
//                                 onChange={(e) => setRememberMe(e.target.checked)}
//                                 className="w-4 h-4 rounded border-gray-600/30 bg-gray-700/20 cursor-pointer accent-blue-500"
//                             />
//                             <label
//                                 htmlFor="remember"
//                                 className="ml-2.5 text-xs text-gray-400 cursor-pointer"
//                             >
//                                 Remember me for 30 days
//                             </label>
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className={`w-full py-3 px-4 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 ${loading
//                                     ? `bg-gradient-to-r ${c.gradient} opacity-50 cursor-not-allowed`
//                                     : `bg-gradient-to-r ${c.gradient} text-gray-900 shadow-lg shadow-blue-500/20`
//                                 }`}
//                         >
//                             <div className="flex items-center justify-center">
//                                 {loading ? (
//                                     <>
//                                         <Loader className="animate-spin mr-2" size={18} />
//                                         Authenticating...
//                                     </>
//                                 ) : (
//                                     "Sign In"
//                                 )}
//                             </div>
//                         </button>
//                     </form>

//                     {/* Divider */}
//                     <div className="flex items-center gap-3 mb-6">
//                         <div className="flex-1 h-px bg-gray-700/30" />
//                         <span className="text-xs text-gray-500">Demo Access</span>
//                         <div className="flex-1 h-px bg-gray-700/30" />
//                     </div>

//                     {/* Test Credentials */}
//                     <button
//                         onClick={fillTestCredentials}
//                         disabled={loading}
//                         className="w-full py-2.5 px-4 bg-gray-700/20 border border-gray-600/30 text-gray-300 text-sm rounded-lg transition-all duration-300 disabled:opacity-50"
//                     >
//                         Load Test Credentials
//                     </button>
//                 </div>

//                 <p className="text-center text-xs text-gray-500 mt-8">
//                     Protected by enterprise-grade security
//                 </p>
//             </div>
//         </section>
//     );
// };
