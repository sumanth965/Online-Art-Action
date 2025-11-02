import React from "react";
import { ShoppingCart } from "lucide-react";
import { LoginForm } from "../components/LoginForm";

export const BuyerLoginPage = ({ handleLogin, onBack }) => (
    <LoginForm
        title="Buyer Login"
        subtitle="Discover and collect artwork"
        color="amber"
        icon={ShoppingCart}
        testCredentials={{ email: "buyer@artvault.com", password: "buyer123" }}
        onSubmit={(data) => handleLogin("Buyer", data)}
        onBack={onBack}
    />
);
