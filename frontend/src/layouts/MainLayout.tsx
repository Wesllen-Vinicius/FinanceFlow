import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      {children || <Outlet />}
    </div>
  );
}
