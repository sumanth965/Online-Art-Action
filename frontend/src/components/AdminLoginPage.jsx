import React from "react";
import { Shield } from "lucide-react";
import { LoginForm } from "../components/LoginForm";

export const AdminLoginPage = ({ handleLogin, onBack }) => (
    <LoginForm
        title="Admin Login"
        subtitle="Manage the platform"
        color="green"
        icon={Shield}
        testCredentials={{ email: "sumanth@gmail.com", password: "123" }}
        onSubmit={(data) => handleLogin("Admin", data)}
        onBack={onBack}
    />
);
