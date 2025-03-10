import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100">
          Faça login
        </h2>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700 rounded-md py-2 px-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Ainda não possui conta?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
