import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import api from "../../services/api";
import CardSummary from "../ui/CardSummary";

const FinancialSummary = () => {
  const [summary, setSummary] = useState({
    saldo: 0,
    receitas: 0,
    despesas: 0,
  });

  useEffect(() => {
    api
      .get("/transactions/dashboard")
      .then((response) => setSummary(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CardSummary
        title="Saldo Atual"
        value={`R$ ${summary.saldo.toFixed(2)}`}
        icon={<DollarSign size={24} />}
        color="text-blue-600"
      />
      <CardSummary
        title="Receitas"
        value={`R$ ${summary.receitas.toFixed(2)}`}
        icon={<TrendingUp size={24} />}
        color="text-emerald-500"
      />
      <CardSummary
        title="Despesas"
        value={`R$ ${summary.despesas.toFixed(2)}`}
        icon={<TrendingDown size={24} />}
        color="text-red-500"
      />
    </div>
  );
};

export default FinancialSummary;
