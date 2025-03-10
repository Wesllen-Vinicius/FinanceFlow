import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-white p-8 rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}
