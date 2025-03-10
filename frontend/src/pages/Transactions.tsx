import { useEffect, useState } from "react";
import {
  getTransactions,
  deleteTransaction,
  Transaction,
} from "../services/transactionService";
import { formatCurrency, formatDate } from "../utils/formatters";
import { Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        console.error("Erro ao buscar transações:", err);
        setError("Erro ao carregar transações.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta transação?")) return;
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Erro ao excluir transação:", err);
      setError("Erro ao excluir transação.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Minhas Transações
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          Nenhuma transação encontrada.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                <th className="p-3 text-left">Título</th>
                <th className="p-3 text-left">Valor</th>
                <th className="p-3 text-left">Categoria</th>
                <th className="p-3 text-left">Data</th>
                <th className="p-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3">{transaction.title}</td>
                  <td
                    className={`p-3 ${
                      transaction.type === "INCOME"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="p-3">
                    {transaction.categoryId || "Sem categoria"}
                  </td>
                  <td className="p-3">{formatDate(transaction.createdAt)}</td>
                  <td className="p-3">
                    <Button
                      onClick={() => handleDelete(transaction.id)}
                      className="bg-red-500 hover:bg-red-700"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Botão flutuante no canto inferior direito */}
      <Link to="/transactions/new" className="fixed bottom-6 right-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition">
          <Plus size={24} />
        </button>
      </Link>
    </div>
  );
};

export default Transactions;
