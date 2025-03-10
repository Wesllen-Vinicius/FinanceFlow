import DashboardLayout from "../layouts/DashboardLayout";
import FinancialSummary from "../components/dashboard/FinancialSummary";
import FinanceCharts from "../components/dashboard/FinanceCharts";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <FinancialSummary />
      <FinanceCharts />
    </DashboardLayout>
  );
}
