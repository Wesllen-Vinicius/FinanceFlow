import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTransaction } from "../services/transactionService";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";

const NewTransaction = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">(0);
  const [type, setType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || amount === "" || Number(amount) <= 0) {
      setError("Preencha todos os campos corretamente.");
      return;
    }

    try {
      await createTransaction({ title, amount: Number(amount), type });
      navigate("/transactions");
    } catch (err) {
      console.error("Erro ao criar transação:", err);
      setError("Erro ao criar transação.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Nova Transação
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Título"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          label="Valor"
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
          required
        />

        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            Tipo
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "INCOME" | "EXPENSE")}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="INCOME">Receita</option>
            <option value="EXPENSE">Despesa</option>
          </select>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Salvar
        </Button>
      </form>
    </div>
  );
};

export default NewTransaction;
