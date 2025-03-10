import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { createUser } from "../services/userService";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUser({ name, email, password });
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;

        if (Array.isArray(message)) {
          setError(message.join(", "));
        } else if (message) {
          setError(message);
        } else {
          setError("Erro desconhecido ao criar usuário");
        }
      } else {
        setError("Erro desconhecido ao criar usuário");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100">
          Criar Conta
        </h2>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700 rounded-md py-2 px-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <Input
            label="Nome"
            type="text"
            placeholder="Seu nome completo"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            Cadastrar
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
