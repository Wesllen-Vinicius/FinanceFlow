import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      {children}
    </div>
  );
}
