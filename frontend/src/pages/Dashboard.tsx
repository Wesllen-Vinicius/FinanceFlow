import FinancialSummary from "../components/dashboard/FinancialSummary";
import FinanceCharts from "../components/dashboard/FinanceCharts";

export default function Dashboard() {
  return (
    <div className="p-8">
      <FinancialSummary />
      <FinanceCharts />
    </div>
  );
}
