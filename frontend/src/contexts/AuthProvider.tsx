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
        console.log("Token encontrado no LocalStorage:", token);
        const decoded = parseJwt(token);
        console.log("Token decodificado:", decoded);

        if (decoded?.userId) {
          try {
            const fetchedUser = await getUserById(decoded.userId);
            console.log("Usuário carregado:", fetchedUser);
            setUser(fetchedUser);
          } catch {
            console.warn("Erro ao carregar usuário, limpando token...");
            localStorage.removeItem("token");
            setUser(null);
            navigate("/login");
          }
        } else {
          console.warn("Token inválido, removendo...");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    loadUser();
  }, [navigate]);

  const login = async (email: string, password: string) => {
    const { access_token } = await loginService(email, password);
    console.log("Token recebido do backend:", access_token);

    localStorage.setItem("token", access_token);

    const decoded = parseJwt(access_token);
    console.log("Token decodificado:", decoded);

    const userId = decoded?.userId || decoded?.sub;
    if (userId) {
      const fetchedUser = await getUserById(userId);
      console.log("Usuário autenticado:", fetchedUser);
      setUser(fetchedUser);
      navigate("/dashboard");
    } else {
      console.error("Erro: Token inválido.");
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
