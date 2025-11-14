import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import AdminLoginForm from "../../components/loginPage/AdminLoginForm";
import { useAuth } from "../../context/AuthContext";

const AdminLoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const { login } = useAuth();

    const handleSubmit = (email, password, rememberMe) => {
        setError("");
        setSuccess(false);

        if (!email || !password) return setError("Please fill in all fields");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return setError("Please enter a valid email address");

        if (email !== "sumanth@gmail.com" || password !== "123")
            return setError("Invalid admin credentials");

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);

            setTimeout(() => {
                login("Admin", "adminLoggedIn"); // ⭐ FIXED ⭐
            }, 1500);

        }, 1500);
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                <Link to="/login" className="flex items-center gap-2 text-gray-500 mb-8">
                    <ArrowLeft size={18} /> Back
                </Link>

                <div className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700/40 shadow-2xl">
                    <div className="flex justify-center mb-8">
                        <div className="p-4 rounded-xl bg-green-500/10 border border-gray-700/50">
                            <Shield size={32} className="text-gray-400" />
                        </div>
                    </div>

                    <AdminLoginForm
                        onSubmit={handleSubmit}
                        loading={loading}
                        success={success}
                        error={error}
                    />
                </div>
            </div>
        </section>
    );
};

export default AdminLoginPage;
