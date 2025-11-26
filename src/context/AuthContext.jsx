/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const AUTH_KEY = "auth_user";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem(AUTH_KEY);
        if (saved) {
            setUser(JSON.parse(saved));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(AUTH_KEY);
    };

    const isLogged = !!user;
    const isAdmin = user?.role === "admin";

    return (
        <AuthContext.Provider value={{user, login, logout, isLogged, isAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);