import React, { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import BuyerAuthForm from "../../components/loginPage/BuyerAuthForm";

const BuyerLoginPage = ({ handleLogin, onBack }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center py-12 px-4 relative overflow-hidden">
            {/* Background blur */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
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

                <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-2xl p-8 rounded-2xl border border-gray-700/40 shadow-2xl">
                    <div className="flex justify-center mb-8">
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-gray-700/50 backdrop-blur-sm">
                            <ShoppingBag size={32} className="text-blue-400" />
                        </div>
                    </div>

                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold tracking-tight mb-2 text-blue-400">
                            {isSignUp ? "Buyer Sign Up" : "Buyer Login"}
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {isSignUp
                                ? "Create a new buyer account"
                                : "Access exclusive art collections"}
                        </p>
                    </div>

                    {/* Child form */}
                    <BuyerAuthForm
                        isSignUp={isSignUp}
                        setIsSignUp={setIsSignUp}
                        handleLogin={handleLogin}
                        success={success}
                        setSuccess={setSuccess}
                        error={error}
                        setError={setError}
                    />
                </div>

                <p className="text-center text-xs text-gray-500 mt-8">
                    Buyer account secured by marketplace protection
                </p>
            </div>
        </section>
    );
};

export default BuyerLoginPage;
