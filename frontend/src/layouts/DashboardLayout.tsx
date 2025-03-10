import { ReactNode } from "react";
import Sidebar from "../components/ui/Sidebar";
import ThemeToggle from "../components/ui/ThemeToggle";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Dashboard
          </h1>
          <ThemeToggle />
        </header>
        {children}
      </main>
    </div>
  );
}
