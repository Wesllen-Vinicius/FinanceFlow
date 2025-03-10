import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";

interface DashboardLayoutProps {
  children?: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 p-8">{children || <Outlet />}</main>
    </div>
  );
}
