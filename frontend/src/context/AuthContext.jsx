import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("Buyer");

    useEffect(() => {
        const token = localStorage.getItem("artistToken");
        if (token) {
            setIsLoggedIn(true);
            setUserRole("Artist");
        }
    }, []);

    const login = (role = "Artist", token = "") => {
        setIsLoggedIn(true);
        setUserRole(role);
        if (token) localStorage.setItem(`${role.toLowerCase()}Token`, token);
    };

    const logout = () => {
        localStorage.removeItem("artistToken");
        setIsLoggedIn(false);
        setUserRole("Buyer");
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, userRole, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
