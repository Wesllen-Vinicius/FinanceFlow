import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  login as loginService,
  logout as logoutService,
} from "../services/authService";
import { getUserById } from "../services/userService";
import { AuthContext } from "./AuthContext";
import { User } from "./AuthTypes";
import { parseJwt } from "../utils/jwt";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = parseJwt(token);
        if (decoded?.userId) {
          try {
            const fetchedUser = await getUserById(decoded.userId);
            setUser(fetchedUser);
          } catch {
            localStorage.removeItem("token");
            setUser(null);
            navigate("/login");
          }
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    loadUser();
  }, [navigate]);

  const login = async (email: string, password: string) => {
    const { token } = await loginService(email, password);
    localStorage.setItem("token", token);
    const decoded = parseJwt(token);
    if (decoded?.userId) {
      const fetchedUser = await getUserById(decoded.userId);
      setUser(fetchedUser);
      navigate("/dashboard");
    } else {
      throw new Error("Token inválido");
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
