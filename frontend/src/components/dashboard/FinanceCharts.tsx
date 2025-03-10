import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { getCategories } from "../../services/categoryService";
import { getTransactions } from "../../services/transactionService";

interface FormattedCategory {
  name: string;
  value: number;
  color: string;
}

interface SaldoHistorico {
  mes: string;
  saldo: number;
}

const FinanceCharts = () => {
  const [categories, setCategories] = useState<FormattedCategory[]>([]);
  const [saldoHistorico, setSaldoHistorico] = useState<SaldoHistorico[]>([]);

  const fetchData = async () => {
    try {
      const [categoriesData, transactionsData] = await Promise.all([
        getCategories(),
        getTransactions(),
      ]);

      // Atualiza categorias com valores gastos
      setCategories(
        categoriesData.map((cat) => ({
          name: cat.name,
          value: cat.totalSpent || 0,
          color: cat.color || "#8884d8",
        }))
      );

      // Processar a evolução do saldo por mês
      let saldoAcumulado = 0;
      const saldoData: SaldoHistorico[] = transactionsData
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ) // Ordena as transações por data
        .map((t) => {
          saldoAcumulado += t.type === "INCOME" ? t.amount : -t.amount;
          return {
            mes: new Date(t.createdAt).toLocaleString("default", {
              month: "short",
            }),
            saldo: saldoAcumulado,
          };
        });

      setSaldoHistorico(saldoData);
    } catch (error) {
      console.error("Erro ao buscar dados financeiros:", error);
    }
  };

  // Atualiza sempre que houver mudanças
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Gráfico de Despesas por Categoria */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Despesas por Categoria
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categories}
              dataKey="value"
              nameKey="name"
              outerRadius={85}
              label
            >
              {categories.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Evolução do Saldo */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Evolução do Saldo
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={saldoHistorico}>
            <XAxis dataKey="mes" stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="saldo"
              stroke="#4f46e5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceCharts;
