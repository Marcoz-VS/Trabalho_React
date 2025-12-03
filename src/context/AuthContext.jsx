/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { getUsers } from "../services/storage";

const AUTH_KEY = "auth_user";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);
      const users = getUsers();

      const found = users.find(u => u.id === parsed.id);

      if (found) setUser(found);
      else localStorage.removeItem(AUTH_KEY);
    }
  }, []);

  const login = (userData) => {
    const users = getUsers();
    const found = users.find(u => u.username === userData.username && u.password === userData.password);

    if (!found) {
      throw new Error("Usuário ou senha incorretos.");
    }

    setUser(found);
    localStorage.setItem(AUTH_KEY, JSON.stringify(found));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const isLogged = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogged, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
