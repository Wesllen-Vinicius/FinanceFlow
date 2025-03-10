import { ReactNode } from "react";

interface CardSummaryProps {
  title: string;
  value: string;
  icon: ReactNode;
  color?: string;
}

const CardSummary = ({
  title,
  value,
  icon,
  color = "text-gray-800",
}: CardSummaryProps) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {title}
        </h3>
        <p className={`text-xl font-bold ${color}`}>{value}</p>
      </div>
      <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">{icon}</div>
    </div>
  );
};

export default CardSummary;
