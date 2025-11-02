import React from "react";
import { Palette } from "lucide-react";
import { LoginForm } from "../components/LoginForm";

export const ArtistLoginPage = ({ handleLogin, onBack }) => (
    <LoginForm
        title="Artist Login"
        subtitle="Showcase and sell your art"
        color="blue"
        icon={Palette}
        testCredentials={{ email: "sumanth@email.com", password: "123" }}
        onSubmit={(data) => handleLogin("Artist", data)}
        onBack={onBack}
    />
);
