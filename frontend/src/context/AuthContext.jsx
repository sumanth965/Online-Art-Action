import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("Buyer");

    useEffect(() => {
        const artistToken = localStorage.getItem("artistToken");
        const adminToken = localStorage.getItem("adminToken");

        if (adminToken) {
            setIsLoggedIn(true);
            setUserRole("Admin");
        } else if (artistToken) {
            setIsLoggedIn(true);
            setUserRole("Artist");
        }
    }, []);

    const login = (role = "Buyer", token = "") => {
        setIsLoggedIn(true);
        setUserRole(role);

        if (role === "Admin") {
            localStorage.setItem("adminToken", "adminLoggedIn");
        } else if (role === "Artist") {
            localStorage.setItem("artistToken", "artistLoggedIn");
        } else {
            localStorage.setItem("buyerToken", "buyerLoggedIn");
        }
    };

    const logout = () => {
        localStorage.removeItem("artistToken");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("buyerToken");

        setIsLoggedIn(false);
        setUserRole("Buyer");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
